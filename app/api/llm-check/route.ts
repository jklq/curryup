import { NextRequest, NextResponse } from "next/server";
import { LLMTest, LLMResult } from "@/lib/types";
import { runLLMFormCheck } from "@/lib/llm";

export async function POST(req: NextRequest) {
  try {
    const { code, llmTests } = await req.json();

    if (!code || !llmTests) {
      return NextResponse.json(
        { error: "Missing code or llmTests" },
        { status: 400 }
      );
    }

    const llmResults: LLMResult[] = [];
    if (Array.isArray(llmTests) && llmTests.length > 0) {
      for (const t of llmTests) {
        try {
          const check = await runLLMFormCheck(code, t);
          llmResults.push({ name: t.name, result: check });
        } catch (e: unknown) {
          const errorMessage = e instanceof Error ? e.message : String(e);
          llmResults.push({ name: t.name, error: errorMessage });
        }
      }
    }

    return NextResponse.json({ llmResults });
  } catch (error: unknown) {
    console.error("Server error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
