---
title: "Custom List"
difficulty: "Medium"
tags: ["Inductive Datatypes", "Polymorphism"]
---

# Instructions

In Haskell, the standard list type `[a]` is actually a recursive data type.
To understand this better, let's define our own list type called `MyList`.

`data MyList a = Empty | Cons a (MyList a)`

- `Empty` represents an empty list (like `[]`).
- `Cons` adds an element to the front of a list (like `:`).

Your task is to implement two standard higher-order functions for this custom list type:

1. `myMap`: Applies a function to every element in the list.
2. `myFilter`: Keeps only elements that satisfy a predicate.

# Examples

```
let list = Cons 1 (Cons 2 (Cons 3 Empty))

myMap (*2) list
--> Cons 2 (Cons 4 (Cons 6 Empty))

myFilter (>1) list
--> Cons 2 (Cons 3 Empty)
```

# Starter Code

```haskell
module CustomList where

data MyList a = Empty | Cons a (MyList a)
  deriving (Show, Eq)

myMap :: (a -> b) -> MyList a -> MyList b
myMap f list = undefined

myFilter :: (a -> Bool) -> MyList a -> MyList a
myFilter p list = undefined
```

# Sample Tests

```haskell
module CustomListSpec where
import CustomList
import Test.Hspec

-- Helper to convert standard list to MyList for easier testing
toMyList :: [a] -> MyList a
toMyList [] = Empty
toMyList (x:xs) = Cons x (toMyList xs)

spec :: Spec
spec = do
  describe "Custom List" $ do
    describe "myMap" $ do
      it "maps over a list of integers" $ do
        let input = toMyList [1, 2, 3]
        let expected = toMyList [2, 4, 6]
        myMap (*2) input `shouldBe` expected

      it "handles empty list" $ do
        myMap (*2) Empty `shouldBe` (Empty :: MyList Int)

      it "changes type" $ do
        let input = toMyList [1, 2]
        let expected = toMyList ["1", "2"]
        myMap show input `shouldBe` expected

    describe "myFilter" $ do
      it "filters elements" $ do
        let input = toMyList [1, 2, 3, 4]
        let expected = toMyList [2, 4]
        myFilter even input `shouldBe` expected

      it "keeps all elements if predicate is true" $ do
        let input = toMyList [1, 2]
        myFilter (const True) input `shouldBe` input

      it "removes all elements if predicate is false" $ do
        let input = toMyList [1, 2]
        myFilter (const False) input `shouldBe` Empty
```

# LLM Tests

```json
[
  {
    "name": "Recursive Implementation",
    "form": "Verify that `myMap` and `myFilter` are implemented recursively using pattern matching on `MyList`."
  }
]
```
