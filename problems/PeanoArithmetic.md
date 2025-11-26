---
title: "Peano Arithmetic"
difficulty: "Medium"
tags: ["Inductive Datatypes", "Logic"]
---

# Instructions

Peano numbers are a way of representing natural numbers using a recursive data type.
`Zero` represents 0.
`Succ n` represents the successor of `n` (i.e., `n + 1`).

For example:

- `Zero` = 0
- `Succ Zero` = 1
- `Succ (Succ Zero)` = 2

Your task is to implement two functions:

1. `toInt`: Converts a `Nat` to a standard Haskell `Int`.
2. `add`: Adds two `Nat` numbers together, returning a new `Nat`.

**Note**: Try to implement `add` recursively without converting to `Int` first!

# Examples

```
toInt (Succ (Succ Zero))
--> 2

add (Succ Zero) (Succ (Succ Zero))
--> Succ (Succ (Succ Zero))  -- (1 + 2 = 3)
```

# Starter Code

```haskell
module PeanoArithmetic where

data Nat = Zero | Succ Nat
  deriving (Show, Eq)

toInt :: Nat -> Int
toInt n = undefined

add :: Nat -> Nat -> Nat
add n m = undefined
```

# Sample Tests

```haskell
module PeanoArithmeticSpec where
import PeanoArithmetic
import Test.Hspec

spec :: Spec
spec = do
  describe "Peano Arithmetic" $ do
    describe "toInt" $ do
      it "converts Zero to 0" $ do
        toInt Zero `shouldBe` 0

      it "converts Succ Zero to 1" $ do
        toInt (Succ Zero) `shouldBe` 1

      it "converts nested Succ to correct integer" $ do
        toInt (Succ (Succ (Succ Zero))) `shouldBe` 3

    describe "add" $ do
      it "adds Zero to a number" $ do
        add Zero (Succ Zero) `shouldBe` Succ Zero
        add (Succ Zero) Zero `shouldBe` Succ Zero

      it "adds two non-zero numbers" $ do
        -- 1 + 2 = 3
        add (Succ Zero) (Succ (Succ Zero)) `shouldBe` Succ (Succ (Succ Zero))

      it "is commutative" $ do
        let two = Succ (Succ Zero)
        let three = Succ (Succ (Succ Zero))
        toInt (add two three) `shouldBe` 5
        toInt (add three two) `shouldBe` 5
```

# LLM Tests

```json
[
  {
    "name": "Recursive Addition",
    "form": "Check if the `add` function is implemented recursively on the `Nat` structure, rather than converting to Int and back."
  }
]
```
