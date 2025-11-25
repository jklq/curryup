export interface LLMTest {
  name: string;
  description?: string;
  // A short instruction describing the FORM to check, e.g. "use foldr"
  form: string;
  // Optional model override for this test
  model?: string;
}

export interface Problem {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  content: string;
  instructions: string;
  examples: string;
  sampleTests: string;
  starterCode: string;
  tags: string[];
  // Optional LLM tests which run using an LLM to validate the required FORM
  llmTests?: LLMTest[];
}

export interface LLMResult {
  name: string;
  result?: {
    pass: boolean;
    reason?: string;
    evidence?: string;
    raw?: string;
  };
  error?: string;
}

export interface RunOutput {
  stdout: string;
  stderr: string;
  llmResults?: LLMResult[];
  error?: string;
  details?: string;
}
