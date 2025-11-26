---
title: "Pythagorean Triples"
difficulty: "Medium"
tags: ["List Comprehension"]
---

# Instructions

Write a function `pythagoreanTriples` that takes an integer `n` and returns a list of all triples `(a, b, c)` such that:

1. `a`, `b`, and `c` are integers between 1 and `n` (inclusive).
2. `a^2 + b^2 = c^2`.
3. `a < b`.

Use a list comprehension to generate the triples.

## Examples

```
pythagoreanTriples 10
-> [(3, 4, 5), (6, 8, 10)]

pythagoreanTriples 5
-> [(3, 4, 5)]

pythagoreanTriples 1
-> []
```

# Starter Code

```haskell
module PythagoreanTriples where

pythagoreanTriples :: Int -> [(Int, Int, Int)]
pythagoreanTriples n = undefined
```

# Sample Tests

```haskell
module PythagoreanTriplesSpec where
import PythagoreanTriples
import Test.Hspec

spec :: Spec
spec = do
  describe "pythagoreanTriples" $ do
    it "finds triples up to 10" $ do
      pythagoreanTriples 10 `shouldBe` [(3, 4, 5), (6, 8, 10)]
    it "finds triples up to 5" $ do
      pythagoreanTriples 5 `shouldBe` [(3, 4, 5)]
    it "returns empty list for small n" $ do
      pythagoreanTriples 1 `shouldBe` []
    it "finds triples up to 15" $ do
      pythagoreanTriples 15 `shouldContain` [(5, 12, 13), (9, 12, 15)]
```
