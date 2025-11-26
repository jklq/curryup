---
title: "Dereplicate Many"
difficulty: "Medium"
tags: ["Lists", "Tuples", "Grouping"]
---

# Instructions

Write a function `dereplicateMany` that acts as the inverse of `replicateMany`.
It should take a list of elements and return a list of pairs `(Int, a)`, where each pair represents a consecutive run of identical elements.
The first element of the pair is the count, and the second is the element itself.

## Examples

```
dereplicateMany "aaabb"
-> [(3, 'a'), (2, 'b')]

dereplicateMany [1, 3, 3, 3]
-> [(1, 1), (3, 3)]

dereplicateMany "Hello"
-> [(1, 'H'), (1, 'e'), (2, 'l'), (1, 'o')]
```

# Starter Code

```haskell
module DereplicateMany where

dereplicateMany :: (Eq a) => [a] -> [(Int, a)]
dereplicateMany list = undefined
```

# Sample Tests

```haskell
module DereplicateManySpec where
import DereplicateMany
import Test.Hspec

spec :: Spec
spec = do
  describe "Dereplicate Many" $ do
    it "groups consecutive characters" $ do
      dereplicateMany "aaabb" `shouldBe` [(3, 'a'), (2, 'b')]
    it "handles single occurrences" $ do
      dereplicateMany [1, 3, 3, 3] `shouldBe` [(1, 1), (3, 3)]
    it "handles mixed runs" $ do
      dereplicateMany "Hello" `shouldBe` [(1, 'H'), (1, 'e'), (2, 'l'), (1, 'o')]
    it "handles empty list" $ do
      dereplicateMany [] `shouldBe` ([] :: [(Int, Char)])
    it "handles non-consecutive duplicates" $ do
      dereplicateMany "aba" `shouldBe` [(1, 'a'), (1, 'b'), (1, 'a')]
```

# LLM Tests

```json
[
  {
    "name": "Grouping Logic",
    "form": "Verify that the solution correctly groups consecutive identical elements."
  }
]
```
