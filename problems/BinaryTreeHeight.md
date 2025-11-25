---
title: "Binary Tree Height"
difficulty: "Medium"
tags: ["Trees", "Recursion"]
---

# Instructions

Given a binary tree definition, write a function `treeHeight` that calculates the height of the tree.
The height of a tree is the number of edges on the longest path from the root to a leaf.
A tree with only a root node has height 0. An empty tree (if supported) or a single node tree logic depends on definition, but here we define:

- `Empty` tree has height -1 (or 0 if you count nodes). Let's stick to:
  - `Empty` -> 0
  - `Node` -> 1 + max(height left, height right)
    Wait, let's align with standard definitions often used in Haskell courses.
    Usually:
    `height Empty = 0`
    `height (Node _ l r) = 1 + max (height l) (height r)`

Let's use the `BinTree` definition from the exams.

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
