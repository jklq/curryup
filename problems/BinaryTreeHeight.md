---
title: "Binary Tree Height"
difficulty: "Medium"
tags: ["Trees", "Recursion"]
---

# Instructions

Given a binary tree definition, write a function `treeHeight` that calculates the height of the tree.
The height of a tree is defined here as the number of nodes on the longest path from the root to a leaf.

- `Empty` tree has height 0.
- `Branch` (node) has height `1 + max(height left, height right)`.

We use the `BinTree` definition:

```haskell
data BinTree a = Empty | Branch (BinTree a) a (BinTree a)
```

## Examples

```
treeHeight Empty
-> 0

treeHeight (Branch Empty 1 Empty)
-> 1

treeHeight (Branch (Branch Empty 2 Empty) 1 Empty)
-> 2
```

# Starter Code

```haskell
module BinaryTreeHeight where

data BinTree a = Empty | Branch (BinTree a) a (BinTree a)
  deriving (Show, Eq)

treeHeight :: BinTree a -> Int
treeHeight tree = undefined
```

# Sample Tests

```haskell
module BinaryTreeHeightSpec where
import BinaryTreeHeight
import Test.Hspec

spec :: Spec
spec = do
  describe "Binary Tree Height" $ do
    it "returns 0 for empty tree" $ do
      treeHeight Empty `shouldBe` 0
    it "returns 1 for single node" $ do
      treeHeight (Branch Empty 1 Empty) `shouldBe` 1
    it "calculates height correctly for deeper trees" $ do
      let t = Branch (Branch Empty 2 Empty) 1 (Branch (Branch Empty 4 Empty) 3 Empty)
      treeHeight t `shouldBe` 3
    it "calculates height for unbalanced tree" $ do
      let t = Branch (Branch (Branch Empty 3 Empty) 2 Empty) 1 Empty
      treeHeight t `shouldBe` 3
```

# LLM Tests

```json
[
  {
    "name": "Recursive Solution",
    "form": "Verify that the solution uses recursion on the tree structure."
  }
]
```
