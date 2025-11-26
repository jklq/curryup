---
title: "Merge Sort"
difficulty: "Medium"
tags: ["Recursion", "Sorting", "Algorithms"]
---

# Instructions

Implement the **Merge Sort** algorithm.

Merge sort is a divide-and-conquer algorithm that works by:

1. Dividing the unsorted list into two approximately equal halves.
2. Recursively sorting each half.
3. Merging the two sorted halves into a single sorted list.

You will need to implement a helper function `merge` (or define it locally) that takes two sorted lists and combines them into one sorted list.

# Examples

```
mergeSort [4, 2, 5, 1, 3]
--> [1, 2, 3, 4, 5]

mergeSort []
--> []
```

# Starter Code

```haskell
module MergeSort where

mergeSort :: Ord a => [a] -> [a]
mergeSort xs = undefined
```

# Sample Tests

```haskell
module MergeSortSpec where
import MergeSort
import Test.Hspec
import Data.List (sort)

spec :: Spec
spec = do
  describe "Merge Sort" $ do
    it "sorts a list of integers" $ do
      mergeSort [4, 2, 5, 1, 3] `shouldBe` [1, 2, 3, 4, 5]

    it "sorts an already sorted list" $ do
      mergeSort [1, 2, 3, 4, 5] `shouldBe` [1, 2, 3, 4, 5]

    it "sorts a reversed list" $ do
      mergeSort [5, 4, 3, 2, 1] `shouldBe` [1, 2, 3, 4, 5]

    it "handles empty lists" $ do
      mergeSort ([] :: [Int]) `shouldBe` []

    it "handles single element lists" $ do
      mergeSort [1] `shouldBe` [1]

    it "handles duplicates" $ do
      mergeSort [3, 1, 2, 1, 3] `shouldBe` [1, 1, 2, 3, 3]
```

# LLM Tests

```json
[
  {
    "name": "Recursive Structure",
    "form": "Verify that the solution implements the merge sort algorithm using recursion."
  }
]
```
