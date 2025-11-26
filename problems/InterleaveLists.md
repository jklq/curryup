---
title: "Interleave Lists"
difficulty: "Easy"
tags: ["Recursion", "Lists"]
---

# Instructions

Write a function `interleave` that takes two lists and returns a new list containing elements from both lists, alternating between them.

If one list is longer than the other, the remaining elements of the longer list should be appended to the end of the result.

# Examples

```
interleave [1, 2, 3] [4, 5, 6]
--> [1, 4, 2, 5, 3, 6]

interleave [1, 2] [3, 4, 5, 6]
--> [1, 3, 2, 4, 5, 6]

interleave "abc" "DE"
--> "aDbEc"
```

# Starter Code

```haskell
module InterleaveLists where

interleave :: [a] -> [a] -> [a]
interleave xs ys = undefined
```

# Sample Tests

```haskell
module InterleaveListsSpec where
import InterleaveLists
import Test.Hspec

spec :: Spec
spec = do
  describe "Interleave Lists" $ do
    it "interleaves lists of equal length" $ do
      interleave [1, 2, 3] [4, 5, 6] `shouldBe` ([1, 4, 2, 5, 3, 6] :: [Int])

    it "interleaves when first list is shorter" $ do
      interleave [1, 2] [3, 4, 5, 6] `shouldBe` ([1, 3, 2, 4, 5, 6] :: [Int])

    it "interleaves when second list is shorter" $ do
      interleave [1, 2, 3, 4] [5, 6] `shouldBe` ([1, 5, 2, 6, 3, 4] :: [Int])

    it "handles empty lists" $ do
      interleave [] [1, 2] `shouldBe` ([1, 2] :: [Int])
      interleave [1, 2] [] `shouldBe` ([1, 2] :: [Int])
      interleave [] [] `shouldBe` ([] :: [Int])
```

# LLM Tests

```json
[
  {
    "name": "Recursive Solution",
    "form": "Verify that the solution uses recursion to traverse the lists."
  }
]
```
