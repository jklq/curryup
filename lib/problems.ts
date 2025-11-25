import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Problem } from "./types";

const problemsDirectory = path.join(process.cwd(), "problems");

export function getProblemSlugs() {
  if (!fs.existsSync(problemsDirectory)) {
    return [];
  }
  return fs.readdirSync(problemsDirectory);
}

export function getProblemBySlug(slug: string): Problem {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(problemsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Simple parsing logic to separate instructions, examples, tests, and starter code
  // This assumes a specific structure in the markdown file

  const instructionsMatch = content.match(
    /# Instructions([\s\S]*?)(?=## Examples|# Starter Code|# Sample Tests|$)/
  );
  const examplesMatch = content.match(
    /## Examples([\s\S]*?)(?=# Starter Code|# Sample Tests|$)/
  );
  const starterCodeMatch = content.match(
    /# Starter Code([\s\S]*?)(?=# Sample Tests|$)/
  );
  const sampleTestsMatch = content.match(
    /# Sample Tests([\s\S]*?)(?=# LLM Tests|$)/
  );
  const llmTestsMatch = content.match(/# LLM Tests([\s\S]*?)(?=\r?\n# |$)/);

  return {
    slug: realSlug,
    title: data.title,
    difficulty: data.difficulty,
    tags: data.tags || [],
    content: content,
    instructions: instructionsMatch ? instructionsMatch[1].trim() : "",
    examples: examplesMatch ? examplesMatch[1].trim() : "",
    starterCode: starterCodeMatch
      ? starterCodeMatch[1]
          .split(/\r?\n/)
          .filter((l) => !l.trim().startsWith("```"))
          .join("\n")
          .trim()
      : "",
    sampleTests: sampleTestsMatch
      ? sampleTestsMatch[1]
          .split(/\r?\n/)
          .filter((l) => !l.trim().startsWith("```"))
          .join("\n")
          .trim()
      : "",
    llmTests: (() => {
      if (!llmTestsMatch) return undefined;
      // Try to extract a JSON code fence first
      const block = llmTestsMatch[1].trim();
      const codeFenceMatch = block.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonText = codeFenceMatch ? codeFenceMatch[1].trim() : block;
      try {
        const parsed = JSON.parse(jsonText);
        return parsed;
      } catch (e) {
        // If JSON fails, return undefined. Consumers should handle undefined.
        return undefined;
      }
    })(),
  };
}

export function getAllProblems(): Problem[] {
  const slugs = getProblemSlugs();
  const problems = slugs
    .filter((slug) => slug.endsWith(".md"))
    .map((slug) => getProblemBySlug(slug));
  return problems;
}
