---
title: "Sum of Binary Tree"
difficulty: "Easy"
tags: ["Trees", "Recursion"]
---

# Instructions

Write a function `sumTree` that calculates the sum of all values stored in a binary tree.
The tree is defined as `BinTree a`, where `a` is a numeric type (`Num`).

## Examples

```
sumTree Empty
-> 0

sumTree (Branch Empty 5 Empty)
-> 5

sumTree (Branch (Branch Empty 2 Empty) 3 (Branch Empty 4 Empty))
-> 9
```

# Starter Code

```haskell
module SumTree where

data BinTree a = Empty | Branch (BinTree a) a (BinTree a)
  deriving (Show, Eq)

sumTree :: (Num a) => BinTree a -> a
sumTree tree = undefined
```

# Sample Tests

```haskell
module SumTreeSpec where
import SumTree
import Test.Hspec

spec :: Spec
spec = do
  describe "Sum Tree" $ do
    it "returns 0 for empty tree" $ do
      sumTree (Empty :: BinTree Int) `shouldBe` 0
    it "returns value for single node" $ do
      sumTree (Branch Empty 5 Empty) `shouldBe` 5
    it "sums all nodes correctly" $ do
      let t = Branch (Branch Empty 2 Empty) 3 (Branch Empty 4 Empty)
      sumTree t `shouldBe` 9
    it "handles negative numbers" $ do
      let t = Branch (Branch Empty (-2) Empty) 3 Empty
      sumTree t `shouldBe` 1
```

# LLM Tests

```json
[
  {
    "name": "Recursive Traversal",
    "form": "Verify that the solution visits all nodes in the tree."
  }
]
```
