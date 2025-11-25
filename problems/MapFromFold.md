---
title: "Map from Fold"
difficulty: "Medium"
tags: ["Higher-order functions", "Fold"]
---

# Instructions

The standard library function `map` applies a function to every element of a list.
Your task is to implement `myMap` using `foldr`. You are **not allowed** to use explicit recursion or the standard `map` function.

## Examples

```
myMap (+1) [1, 2, 3]
-> [2, 3, 4]
```

# Starter Code

```haskell
module MapFromFold where

myMap :: (a -> b) -> [a] -> [b]
myMap f xs = undefined -- Use foldr here
```

# Sample Tests

```haskell
module MapFromFoldSpec where
import MapFromFold
import Test.Hspec

spec :: Spec
spec = do
  describe "Map from Fold" $ do
    it "behaves like map" $ do
      myMap (+1) [1, 2, 3] `shouldBe` [2, 3, 4]
    it "handles empty list" $ do
      myMap (+1) [] `shouldBe` []
    it "changes types" $ do
      myMap show [1, 2, 3] `shouldBe` ["1", "2", "3"]
```

# LLM Tests

```json
[
  {
    "name": "Use Foldr",
    "form": "Check if the user used foldr in their implementation."
  }
]
```
