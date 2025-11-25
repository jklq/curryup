---
title: "Sum of Squares"
difficulty: "Easy"
tags: ["Lists"]
---

# Instructions

Write a function `sumOfSquares` that takes a list of `Integer`s and returns the sum of the squares of each element.

You can use list comprehension or higher-order functions like `map` and `sum`.

## Examples

```
sumOfSquares [1, 2, 3]
-- 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14
-> 14

sumOfSquares [0, 5]
-- 0^2 + 5^2 = 0 + 25 = 25
-> 25

sumOfSquares []
-> 0
```

# Starter Code

```haskell
module SumOfSquares where

sumOfSquares :: [Integer] -> Integer
sumOfSquares nums = undefined
```

# Sample Tests

```haskell
module SumOfSquaresSpec where
import SumOfSquares
import Test.Hspec

spec :: Spec
spec = do
  describe "Sum of Squares" $ do
    it "calculates sum of squares for [1, 2, 3]" $ do
      sumOfSquares [1, 2, 3] `shouldBe` 14
    it "calculates sum of squares for [0, 5]" $ do
      sumOfSquares [0, 5] `shouldBe` 25
    it "returns 0 for empty list" $ do
      sumOfSquares [] `shouldBe` 0
    it "handles negative numbers" $ do
      sumOfSquares [-2, 2] `shouldBe` 8
```

# LLM Tests

```json
[
  {
    "name": "List Comprehension or Map",
    "form": "Check if the user used list comprehension or map/fold."
  }
]
```
