import { NextRequest, NextResponse } from "next/server";
import { LLMTest, LLMResult, RunOutput } from "@/lib/types";
import { runLLMFormCheck } from "@/lib/llm";

export async function POST(req: NextRequest) {
  try {
    let { code, testCode, llmTests, skipLLM } = await req.json();

    if (!code || !testCode) {
      return NextResponse.json(
        { error: "Missing code or testCode" },
        { status: 400 }
      );
    }

    // Strip markdown code fences if present
    const stripFences = (str: string) => {
      console.log("--- stripFences input ---");
      console.log(JSON.stringify(str));
      const lines = str.split(/\r?\n/);
      const filtered = lines.filter((line) => {
        const trimmed = line.trim();
        const isFence = trimmed.startsWith("```");
        if (isFence) console.log("Removing fence line:", JSON.stringify(line));
        return !isFence;
      });
      const result = filtered.join("\n").trim();
      console.log("--- stripFences output ---");
      console.log(JSON.stringify(result));
      return result;
    };

    console.log("Processing code...");
    code = stripFences(code);
    console.log("Processing testCode...");
    testCode = stripFences(testCode);

    let result: RunOutput;
    const runnerUrl = process.env.RUNNER_SERVICE_URL;

    if (!runnerUrl) {
      return NextResponse.json(
        { error: "RUNNER_SERVICE_URL not configured" },
        { status: 500 }
      );
    }

    try {
      const response = await fetch(`${runnerUrl}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, testCode }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Runner service error: ${response.status} ${text}`);
      }

      const data = await response.json();
      result = { stdout: data.stdout, stderr: data.stderr };
      if (data.error) {
        result.stderr = (result.stderr || "") + "\n" + data.error;
      }
    } catch (error: unknown) {
      console.error("Runner service failed:", error);
      return NextResponse.json(
        {
          stdout: "",
          stderr:
            error instanceof Error ? error.message : "Unknown runner error",
        },
        { status: 200 } // Return 200 so the frontend displays the error in the console output
      );
    }

    // If there are any LLM tests defined, run them now
    if (!skipLLM && Array.isArray(llmTests) && llmTests.length > 0) {
      const llmResults: LLMResult[] = [];
      for (const t of llmTests) {
        try {
          const check = await runLLMFormCheck(code, t);
          llmResults.push({ name: t.name, result: check });
        } catch (e: unknown) {
          const errorMessage = e instanceof Error ? e.message : String(e);
          llmResults.push({ name: t.name, error: errorMessage });
        }
      }
      result.llmResults = llmResults;
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Server error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
