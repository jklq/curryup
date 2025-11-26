import { LLMTest } from "@/lib/types";

export async function runLLMFormCheck(code: string, test: LLMTest) {
  console.log("=== Starting LLM Form Check ===");
  console.log("Test name:", test.name);
  console.log("Test form:", test.form);

  // test: { name, description?, form, model? }
  const apiKey = process.env.OPENROUTER_API_KEY;
  console.log("API Key exists:", !!apiKey);
  console.log("API Key length:", apiKey?.length || 0);

  if (!apiKey) {
    console.error("OPENROUTER_API_KEY not set in environment variables");
    throw new Error("OPENROUTER_API_KEY not set");
  }

  const model = test.model || "openai/gpt-oss-120b:exacto";
  console.log("Using model:", model);

  // Build a prompt asking the model to strictly check whether the provided Haskell code
  // uses the required FORM (e.g., `use foldr`), and to return a JSON object
  const system = `You are a code analysis assistant that answers ONLY in JSON.\nRespond with valid JSON only.`;
  const user = `Check whether the following Haskell solution conforms to the requested FORM.\n\nFORM: ${
    test.form
  }\n\nDescription: ${
    test.description || ""
  }\n\nHaskell solution:\n\n${code}\n\nReturn JSON: {"pass": true|false, "reason": "short explanation", "evidence": "optional code snippets or hints"}`;

  const body = {
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    // Request a concise response
    max_tokens: 512,
    temperature: 0,
  };

  console.log("Request body:", JSON.stringify(body, null, 2));
  console.log("Fetching from OpenRouter API...");

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);

    if (!res.ok) {
      const text = await res.text();
      console.error("OpenRouter API error response:", text);
      throw new Error(`OpenRouter error: ${res.status} ${text}`);
    }

    const data = await res.json();
    console.log("Response data:", JSON.stringify(data, null, 2));

    // OpenRouter returns choices[].message.content similar to chat completions
    const content =
      data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || "";
    console.log("Extracted content:", content);

    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    let parsed;
    if (jsonMatch) {
      console.log("Found JSON in response:", jsonMatch[0]);
      try {
        parsed = JSON.parse(jsonMatch[0]);
        console.log("Parsed result:", parsed);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        // if parsing fails, return raw content as failure
        return {
          pass: false,
          reason: "model returned non-parseable JSON",
          raw: content,
        };
      }
    } else {
      console.warn("No JSON found in model response");
      // No JSON found — return failure with model text
      return { pass: false, reason: "no JSON in model response", raw: content };
    }

    console.log("=== LLM Form Check Complete ===");
    return parsed;
  } catch (error: unknown) {
    console.error("Fetch error in runLLMFormCheck:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
}
