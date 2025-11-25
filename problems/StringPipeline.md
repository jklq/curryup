---
title: "String Pipeline"
difficulty: "Easy"
tags: ["Composition", "Strings"]
---

# Instructions

Implement a function `processString` that performs the following operations on an input string in this specific order:

1. Convert the string to uppercase.
2. Reverse the string.
3. Take the first 5 characters.

You should use function composition (`.`) to chain these operations.

## Examples

```
"hello world" -> "DLROW"
"haskell" -> "LLEKS"
"abc" -> "CBA"
```

# Starter Code

```haskell
module StringPipeline where

import Data.Char (toUpper)

processString :: String -> String
processString = undefined
```

# Sample Tests

```haskell
module StringPipelineSpec where
import StringPipeline
import Test.Hspec

spec :: Spec
spec = do
  describe "processString" $ do
    it "processes 'hello world' correctly" $ do
      processString "hello world" `shouldBe` "DLROW"
    it "processes 'haskell' correctly" $ do
      processString "haskell" `shouldBe` "LLEKS"
    it "handles short strings" $ do
      processString "abc" `shouldBe` "CBA"
```

# LLM Tests

```json
[
  {
    "name": "Uses Composition",
    "form": "Check if the user used the composition operator (.) to chain the functions."
  }
]
```
