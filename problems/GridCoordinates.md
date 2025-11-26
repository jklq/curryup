---
title: "Grid Coordinates"
difficulty: "Easy"
tags: ["List Comprehension"]
---

# Instructions

Write a function `gridCoords` that takes two integers `m` and `n`, and returns a list of all pairs `(x, y)` where:

1. `0 <= x <= m`
2. `0 <= y <= n`
3. `x` is not equal to `y`

Use a list comprehension.

## Examples

```
gridCoords 1 2
-> [(0, 1), (0, 2), (1, 0), (1, 2)]
-- (0,0) and (1,1) are excluded

gridCoords 0 0
-> []
```

# Starter Code

```haskell
module GridCoordinates where

gridCoords :: Int -> Int -> [(Int, Int)]
gridCoords m n = undefined
```

# Sample Tests

```haskell
module GridCoordinatesSpec where
import GridCoordinates
import Test.Hspec

spec :: Spec
spec = do
  describe "gridCoords" $ do
    it "generates coordinates for 1x2 grid excluding diagonal" $ do
      gridCoords 1 2 `shouldBe` [(0, 1), (0, 2), (1, 0), (1, 2)]
    it "returns empty list for 0x0" $ do
      gridCoords 0 0 `shouldBe` []
    it "works for 2x2" $ do
      gridCoords 2 2 `shouldBe` [(0, 1), (0, 2), (1, 0), (1, 2), (2, 0), (2, 1)]
```
