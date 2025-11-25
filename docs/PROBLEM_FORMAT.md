# Problem Definition Format

Problems in CurryUp are defined using Markdown files located in the `problems/` directory. Each file represents a single coding problem and must follow a specific structure to be correctly parsed and displayed by the application.

## File Structure

The file consists of YAML frontmatter followed by several markdown sections.

### Frontmatter

The file must start with a YAML frontmatter block containing metadata about the problem.

```yaml
---
title: "Problem Title"
difficulty: "Easy" # Options: "Easy", "Medium", "Hard"
tags: ["Tag1", "Tag2"]
---
```

### Sections

The content is divided into specific sections using Markdown headers. The parser relies on these headers to extract the relevant content.

#### 1. Instructions (`# Instructions`)

This section contains the main description of the problem. You can use standard Markdown formatting here (bold, italics, lists, etc.).

#### 2. Examples (`## Examples`)

This subsection (usually nested under Instructions or following it) provides examples of input and output.

#### 3. Starter Code (`# Starter Code`)

This section contains the initial code provided to the user.
**Important:** The content should be wrapped in a code block (e.g., ` ```haskell ... ``` `). The parser will extract the code _inside_ the block.

#### 4. Sample Tests (`# Sample Tests`)

This section contains the unit tests that will be run against the user's code.
**Important:** Like the starter code, this should be wrapped in a code block. The parser extracts the code inside.

#### 5. LLM Tests (`# LLM Tests`) (Optional)

This section allows defining "form" checks that are validated by an LLM (e.g., "Did the user use recursion?").
The content must be a JSON array wrapped in a code block.

JSON Structure:

```json
[
  {
    "name": "Test Name",
    "description": "Optional description",
    "form": "Instruction for the LLM, e.g., 'Check if the solution uses tail recursion.'",
    "model": "Optional model override"
  }
]
```

## Example File

```markdown
---
title: "Digital Root"
difficulty: "Easy"
tags: ["Mathematics", "Algorithms"]
---

# Instructions

Digital root is the **recursive sum of all the digits in a number**.

Given `n`, take the sum of the digits of `n`. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.

## Examples
```

16 --> 1 + 6 = 7
942 --> 9 + 4 + 2 = 15 --> 1 + 5 = 6

````

# Starter Code

```haskell
module DigitalRoot where

digitalRoot :: Int -> Int
digitalRoot n = undefined
````

# Sample Tests

```haskell
module DigitalRootSpec where
import DigitalRoot
import Test.Hspec

spec :: Spec
spec = do
  describe "Digital Root" $ do
    it "calculates correctly" $ do
      digitalRoot 16 `shouldBe` 7
```

# LLM Tests

```json
[
  {
    "name": "Recursive Solution",
    "form": "Verify that the solution is recursive."
  }
]
```

## Parsing Logic

The parsing logic is located in `lib/problems.ts`. It uses regular expressions to split the file based on the headers. Ensure you use the exact header names:

- `# Instructions`
- `## Examples`
- `# Starter Code`
- `# Sample Tests`
- `# LLM Tests`
