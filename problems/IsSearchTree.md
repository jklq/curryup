---
title: "Is Binary Search Tree"
difficulty: "Medium"
tags: ["Trees", "BST", "Recursion"]
---

# Instructions

Write a function `isSearchTree` that checks if a given binary tree satisfies the Binary Search Tree (BST) property.
A binary tree is a BST if for every node:

1. All values in the left subtree are less than the node's value.
2. All values in the right subtree are greater than the node's value.
3. Both left and right subtrees are also BSTs.

Assume strict inequality (no duplicate values allowed for simplicity, or treat duplicates as invalid).

## Examples

```
isSearchTree Empty
-> True

isSearchTree (Branch (Branch Empty 1 Empty) 2 (Branch Empty 3 Empty))
-> True

isSearchTree (Branch (Branch Empty 3 Empty) 2 (Branch Empty 1 Empty))
-> False
```

# Starter Code

```haskell
module IsSearchTree where

data BinTree a = Empty | Branch (BinTree a) a (BinTree a)
  deriving (Show, Eq)

isSearchTree :: (Ord a) => BinTree a -> Bool
isSearchTree tree = undefined
```

# Sample Tests

```haskell
module IsSearchTreeSpec where
import IsSearchTree
import Test.Hspec

spec :: Spec
spec = do
  describe "Is Search Tree" $ do
    it "returns True for empty tree" $ do
      isSearchTree (Empty :: BinTree Int) `shouldBe` True
    it "returns True for single node" $ do
      isSearchTree (Branch Empty 1 Empty) `shouldBe` True
    it "returns True for valid BST" $ do
      let t = Branch (Branch Empty 1 Empty) 2 (Branch Empty 3 Empty)
      isSearchTree t `shouldBe` True
    it "returns False for invalid BST (left child > root)" $ do
      let t = Branch (Branch Empty 3 Empty) 2 Empty
      isSearchTree t `shouldBe` False
    it "returns False for invalid BST (right child < root)" $ do
      let t = Branch Empty 2 (Branch Empty 1 Empty)
      isSearchTree t `shouldBe` False
    it "returns False for deep violation" $ do
      -- Root is 5, Left is 3. Left's Right is 6 (which is > 5, invalid)
      let t = Branch (Branch Empty 3 (Branch Empty 6 Empty)) 5 Empty
      isSearchTree t `shouldBe` False
```

# LLM Tests

```json
[
  {
    "name": "BST Property Check",
    "form": "Verify that the solution correctly validates the BST property for all nodes, including deep subtrees."
  }
]
```
