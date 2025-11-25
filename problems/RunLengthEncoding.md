---
title: "Run Length Encoding"
difficulty: "Medium"
tags: ["Lists"]
---

# Instructions

Implement a function `runLengthEncoding` that takes a list of elements (which are instances of `Eq`) and returns a list of tuples. Each tuple should contain the count of consecutive identical elements and the element itself.

This is a simple form of data compression.

## Examples

```
runLengthEncoding "aaabbc"
-> [(3, 'a'), (2, 'b'), (1, 'c')]

runLengthEncoding [1, 1, 1, 2, 3, 3]
-> [(3, 1), (1, 2), (2, 3)]

runLengthEncoding []
-> []
```

# Starter Code

```haskell
module RunLengthEncoding where

runLengthEncoding :: (Eq a) => [a] -> [(Int, a)]
runLengthEncoding xs = undefined
```

# Sample Tests

```haskell
module RunLengthEncodingSpec where
import RunLengthEncoding
import Test.Hspec

spec :: Spec
spec = do
  describe "Run Length Encoding" $ do
    it "encodes a string correctly" $ do
      runLengthEncoding "aaabbc" `shouldBe` [(3, 'a'), (2, 'b'), (1, 'c')]
    it "encodes a list of numbers" $ do
      runLengthEncoding [1, 1, 1, 2, 3, 3] `shouldBe` [(3, 1), (1, 2), (2, 3)]
    it "handles single elements" $ do
      runLengthEncoding "abc" `shouldBe` [(1, 'a'), (1, 'b'), (1, 'c')]
    it "handles empty list" $ do
      runLengthEncoding ([] :: [Int]) `shouldBe` []
```

# LLM Tests

```json
[
  {
    "name": "Correct Grouping",
    "form": "Verify that the solution correctly groups consecutive elements."
  }
]
```
