---
title: "Remove Maximum Element"
difficulty: "Easy"
tags: ["Lists", "Recursion"]
---

# Instructions

Write a function `removeMaximum` that removes all occurrences of the maximum element from a list.
You can assume the list elements are orderable (`Ord`).
If the list is empty, return an empty list.

## Examples

```
removeMaximum [1, 2, 3, 2, 1]
-> [1, 2, 2, 1]

removeMaximum [1, 6, 2, 6, 4]
-> [1, 2, 4]

removeMaximum []
-> []
```

# Starter Code

```haskell
module RemoveMaximum where

removeMaximum :: (Ord a) => [a] -> [a]
removeMaximum list = undefined
```

# Sample Tests

```haskell
module RemoveMaximumSpec where
import RemoveMaximum
import Test.Hspec

spec :: Spec
spec = do
  describe "Remove Maximum" $ do
    it "removes single maximum" $ do
      removeMaximum [1, 2, 3, 2, 1] `shouldBe` [1, 2, 2, 1]
    it "removes multiple maximums" $ do
      removeMaximum [1, 6, 2, 6, 4] `shouldBe` [1, 2, 4]
    it "handles empty list" $ do
      removeMaximum [] `shouldBe` ([] :: [Int])
    it "handles list with all same elements" $ do
      removeMaximum [5, 5, 5] `shouldBe` []
    it "handles negative numbers" $ do
      removeMaximum [-1, -5, -2] `shouldBe` [-5, -2]
```

# LLM Tests

```json
[
  {
    "name": "Correctness",
    "form": "Verify that the function correctly identifies and removes the maximum element(s)."
  }
]
```
