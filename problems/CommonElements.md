---
title: "Common Elements"
difficulty: "Easy"
tags: ["List Comprehension"]
---

# Instructions

Write a function `commonElements` that takes two lists of integers and returns a list containing elements that appear in both lists.

The result should contain duplicates if the element appears multiple times in the first list and is present in the second list. The order should be preserved from the first list.

Use a list comprehension.

## Examples

```
commonElements [1, 2, 3, 4] [2, 4, 6]
-> [2, 4]

commonElements [1, 2, 2, 3] [2]
-> [2, 2]

commonElements [1, 2] [3, 4]
-> []
```

# Starter Code

```haskell
module CommonElements where

commonElements :: [Int] -> [Int] -> [Int]
commonElements xs ys = undefined
```

# Sample Tests

```haskell
module CommonElementsSpec where
import CommonElements
import Test.Hspec

spec :: Spec
spec = do
  describe "commonElements" $ do
    it "finds common elements" $ do
      commonElements [1, 2, 3, 4] [2, 4, 6] `shouldBe` [2, 4]
    it "preserves duplicates from first list" $ do
      commonElements [1, 2, 2, 3] [2] `shouldBe` [2, 2]
    it "returns empty list when no common elements" $ do
      commonElements [1, 2] [3, 4] `shouldBe` []
    it "works with empty lists" $ do
      commonElements [] [1, 2] `shouldBe` []
      commonElements [1, 2] [] `shouldBe` []
```
