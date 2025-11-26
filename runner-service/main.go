package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"
)

type RunRequest struct {
	Code     string `json:"code"`
	TestCode string `json:"testCode"`
}

type RunResponse struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
	Error  string `json:"error,omitempty"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/run", handleRun)
	http.HandleFunc("/health", handleHealth)

	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}

func handleRun(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RunRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Code == "" || req.TestCode == "" {
		http.Error(w, "Missing code or testCode", http.StatusBadRequest)
		return
	}

	// Strip markdown fences
	req.Code = stripFences(req.Code)
	req.TestCode = stripFences(req.TestCode)

	// Create temp dir
	runID := uuid.New().String()
	tmpDir := filepath.Join(os.TempDir(), "curryup", runID)
	if err := os.MkdirAll(tmpDir, 0755); err != nil {
		log.Printf("Failed to create temp dir: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	defer os.RemoveAll(tmpDir)

	// Determine module name
	moduleName, codeWithModule := determineModuleName(req.Code, req.TestCode)
	solutionFileName := moduleName + ".hs"

	if err := ioutil.WriteFile(filepath.Join(tmpDir, solutionFileName), []byte(codeWithModule), 0644); err != nil {
		log.Printf("Failed to write solution file: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Determine test module name
	testModuleName := determineTestModuleName(req.TestCode)
	testFileName := testModuleName + ".hs"

	// Ensure main exists in test code
	testCode := req.TestCode
	if !strings.Contains(testCode, "main =") && !strings.Contains(testCode, "main::") {
		testCode += "\n\nmain :: IO ()\nmain = hspec spec\n"
	}

	if err := ioutil.WriteFile(filepath.Join(tmpDir, testFileName), []byte(testCode), 0644); err != nil {
		log.Printf("Failed to write test file: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Run runghc with Safe Haskell enabled
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Enable Safe Haskell to restrict dangerous language features
	// -XSafe: Enforces the safe language subset
	// -fpackage-trust: Required for package trust system
	// -Wall: Show all warnings for better error messages
	// We wrap execution in safe_run.sh to enforce resource limits (ulimit)
	cmd := exec.CommandContext(ctx, "/app/safe_run.sh", "runghc",
		"-XSafe",                    // Enable Safe Haskell
		"-fpackage-trust",           // Enable package trust
		"-Wall",                     // Show warnings
		fmt.Sprintf("-i%s", tmpDir), // Include path
		filepath.Join(tmpDir, testFileName))
	cmd.Dir = tmpDir

	// Resource limits are now handled by safe_run.sh via ulimit

	// Capture output
	var stdoutBuf, stderrBuf strings.Builder
	cmd.Stdout = &stdoutBuf
	cmd.Stderr = &stderrBuf

	err := cmd.Run()

	resp := RunResponse{
		Stdout: stdoutBuf.String(),
		Stderr: stderrBuf.String(),
	}

	if ctx.Err() == context.DeadlineExceeded {
		resp.Stderr += "\nExecution timed out"
	} else if err != nil {
		// If it's an exit error, it's already captured in stderr usually.
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func stripFences(s string) string {
	lines := strings.Split(s, "\n")
	var result []string
	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if strings.HasPrefix(trimmed, "```") {
			continue
		}
		result = append(result, line)
	}
	return strings.Join(result, "\n")
}

func determineModuleName(code, testCode string) (string, string) {
	re := regexp.MustCompile(`module\s+([A-Z][a-zA-Z0-9_]*)\s+where`)
	matches := re.FindStringSubmatch(code)
	if len(matches) > 1 {
		return matches[1], code
	}

	// Infer from test code imports
	importRe := regexp.MustCompile(`import\s+([A-Z][a-zA-Z0-9_.]*)`)
	importMatches := importRe.FindAllStringSubmatch(testCode, -1)

	var candidate string
	for _, m := range importMatches {
		if len(m) > 1 {
			imp := m[1]
			if !strings.HasPrefix(imp, "Test.") && imp != "Test" &&
				!strings.HasPrefix(imp, "System.") && imp != "Prelude" &&
				!strings.HasPrefix(imp, "Data.") {
				candidate = imp
				break
			}
		}
	}

	moduleName := candidate
	if moduleName == "" {
		moduleName = "Solution"
	}

	return moduleName, fmt.Sprintf("module %s where\n\n%s", moduleName, code)
}

func determineTestModuleName(testCode string) string {
	re := regexp.MustCompile(`module\s+([A-Z][a-zA-Z0-9_]*)\s+where`)
	matches := re.FindStringSubmatch(testCode)
	if len(matches) > 1 {
		return matches[1]
	}
	return "Test"
}
