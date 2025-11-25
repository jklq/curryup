---
title: "Sum of Even Squares"
difficulty: "Medium"
tags: ["Composition", "Lists"]
---

# Instructions

Implement a function `sumEvenSquares` that takes a list of integers and returns the sum of the squares of the even numbers in the list.

You should use function composition (`.`) to combine `sum`, `map`, and `filter`. Try to write the function in point-free style (without explicitly naming the input list argument).

## Examples

```
[1, 2, 3, 4] -> 2^2 + 4^2 = 4 + 16 = 20
[1, 3, 5] -> 0
[2, 10] -> 4 + 100 = 104
```

# Starter Code

```haskell
module EvenSquares where

sumEvenSquares :: [Int] -> Int
sumEvenSquares = undefined
```

# Sample Tests

```haskell
module EvenSquaresSpec where
import EvenSquares
import Test.Hspec

spec :: Spec
spec = do
  describe "sumEvenSquares" $ do
    it "calculates sum of even squares for [1..4]" $ do
      sumEvenSquares [1, 2, 3, 4] `shouldBe` 20
    it "returns 0 for list of odd numbers" $ do
      sumEvenSquares [1, 3, 5] `shouldBe` 0
    it "works for [2, 10]" $ do
      sumEvenSquares [2, 10] `shouldBe` 104
    it "returns 0 for empty list" $ do
      sumEvenSquares [] `shouldBe` 0
```

# LLM Tests

```json
[
  {
    "name": "Uses Composition",
    "form": "Check if the user used the composition operator (.) to chain map, filter, and sum."
  },
  {
    "name": "Point-free Style",
    "form": "Check if the user implemented the function in point-free style (without explicitly naming the input list argument)."
  }
]
```
