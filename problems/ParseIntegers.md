---
title: "Parse Integers"
difficulty: "Medium"
tags: ["Parsing", "Strings"]
---

# Instructions

Write a function `parseIntegers` that takes a string of comma-separated integers and returns a list of `Int`.
If the string contains invalid characters or malformed numbers, return `Nothing`.
Spaces around numbers should be ignored.

## Examples

```
parseIntegers "1, 2, 3"
-> Just [1, 2, 3]

parseIntegers "10,20,30"
-> Just [10, 20, 30]

parseIntegers "1, foo, 3"
-> Nothing

parseIntegers ""
-> Just []
```

# Starter Code

```haskell
module ParseIntegers where

import Text.Read (readMaybe)

parseIntegers :: String -> Maybe [Int]
parseIntegers input = undefined
```

# Sample Tests

```haskell
module ParseIntegersSpec where
import ParseIntegers
import Test.Hspec

spec :: Spec
spec = do
  describe "Parse Integers" $ do
    it "parses simple list" $ do
      parseIntegers "1,2,3" `shouldBe` Just [1, 2, 3]
    it "handles spaces" $ do
      parseIntegers " 1 , 2 , 3 " `shouldBe` Just [1, 2, 3]
    it "returns Nothing for invalid input" $ do
      parseIntegers "1,a,3" `shouldBe` Nothing
    it "handles empty string" $ do
      parseIntegers "" `shouldBe` Just []
```

# LLM Tests

```json
[
  {
    "name": "String Splitting",
    "form": "Check if the user splits the string by commas and handles whitespace."
  }
]
```
