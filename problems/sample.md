---
title: "Digital Root"
difficulty: "Easy"
tags: ["Recursion"]
---

# Instructions

Digital root is the **recursive sum of all the digits in a number**.

Given `n`, take the sum of the digits of `n`. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.

## Examples

```
16 --> 1 + 6 = 7
942 --> 9 + 4 + 2 = 15 --> 1 + 5 = 6
132189 --> 1 + 3 + 2 + 1 + 8 + 9 = 24 --> 2 + 4 = 6
493193 --> 4 + 9 + 3 + 1 + 9 + 3 = 29 --> 2 + 9 = 11 --> 1 + 1 = 2
```

# Starter Code

```haskell
module DigitalRoot where

-- Type signature for the function
-- TODO: Update the type signature based on your implementation
digitalRoot :: Int -> Int
digitalRoot n = undefined  -- Implement your solution here
```

# Sample Tests

```haskell
module DigitalRootSpec where
import DigitalRoot
import Test.Hspec

spec :: Spec
spec = do
  describe "Testing solution:" $ do
    it "Should compute non-recursive roots, and 0:" $ do
      digitalRoot 16 `shouldBe` 7
      digitalRoot 0 `shouldBe` 0
```

# LLM Tests

```json
[
  {
    "name": "MustUseFoldr",
    "description": "Solution must be implemented using `foldr` (no explicit recursive definitions).",
    "form": "use foldr",
    "model": "openai/gpt-oss-120b:exacto"
  }
]
```
