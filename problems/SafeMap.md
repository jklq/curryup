---
title: "Safe Map"
difficulty: "Easy"
tags: ["Maybe", "Higher-order functions"]
---

# Instructions

Implement a function `safeMap` that takes a function `f :: a -> Maybe b` and a list `[a]`.
It should apply the function to every element in the list.
If `f` returns `Just x` for all elements, `safeMap` should return `Just` of the list of results.
If `f` returns `Nothing` for _any_ element, `safeMap` should return `Nothing`.

## Examples

```haskell
safeDiv2 :: Int -> Maybe Int
safeDiv2 x = if x `mod` 2 == 0 then Just (x `div` 2) else Nothing

safeMap safeDiv2 [2, 4, 6]
-> Just [1, 2, 3]

safeMap safeDiv2 [2, 3, 6]
-> Nothing
```

# Starter Code

```haskell
module SafeMap where

safeMap :: (a -> Maybe b) -> [a] -> Maybe [b]
safeMap f xs = undefined
```

# Sample Tests

```haskell
module SafeMapSpec where
import SafeMap
import Test.Hspec

spec :: Spec
spec = do
  describe "Safe Map" $ do
    let safeDiv2 x = if x `mod` 2 == 0 then Just (x `div` 2) else Nothing

    it "returns Just list if all succeed" $ do
      safeMap safeDiv2 [2, 4, 6] `shouldBe` Just [1, 2, 3]

    it "returns Nothing if one fails" $ do
      safeMap safeDiv2 [2, 3, 6] `shouldBe` Nothing

    it "returns Just [] for empty list" $ do
      safeMap safeDiv2 [] `shouldBe` Just []
```

# LLM Tests

```json
[
  {
    "name": "Short Circuit",
    "form": "Check if the solution correctly handles the Nothing case (short-circuiting or propagating)."
  }
]
```
