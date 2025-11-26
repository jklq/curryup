---
title: "Replicate Many"
difficulty: "Easy"
tags: ["Lists", "Tuples"]
---

# Instructions

Write a function `replicateMany` that takes a list of pairs `(Int, a)` and returns a list of `a`.
The first element of the pair indicates how many times the second element should be repeated.

## Examples

```
replicateMany [(3, 'a'), (2, 'b')]
-> "aaabb"

replicateMany [(1, 1), (0, 2), (3, 3)]
-> [1, 3, 3, 3]

replicateMany []
-> []
```

# Starter Code

```haskell
module ReplicateMany where

replicateMany :: [(Int, a)] -> [a]
replicateMany list = undefined
```

# Sample Tests

```haskell
module ReplicateManySpec where
import ReplicateMany
import Test.Hspec

spec :: Spec
spec = do
  describe "Replicate Many" $ do
    it "replicates characters" $ do
      replicateMany [(3, 'a'), (2, 'b')] `shouldBe` "aaabb"
    it "handles zero counts" $ do
      replicateMany [(1, 1), (0, 2), (3, 3)] `shouldBe` [1, 3, 3, 3]
    it "handles empty list" $ do
      replicateMany [] `shouldBe` ([] :: [Int])
    it "preserves order" $ do
      replicateMany [(2, 'x'), (1, 'y'), (2, 'z')] `shouldBe` "xxyzz"
```

# LLM Tests

```json
[
  {
    "name": "Usage of replicate",
    "form": "Check if the solution uses the standard `replicate` function or equivalent logic."
  }
]
```
