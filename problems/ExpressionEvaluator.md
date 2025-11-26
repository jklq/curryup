---
title: "Expression Evaluator"
difficulty: "Medium"
tags: ["Case Expressions", "Datatypes", "Trees"]
---

# Instructions

You are given a recursive data type `Expr` representing simple arithmetic expressions involving addition and multiplication.

Your task is to implement a function `eval` that evaluates an `Expr` to an integer.

The `Expr` type is defined as:

- `Val Int`: A literal integer value.
- `Add Expr Expr`: The sum of two expressions.
- `Mul Expr Expr`: The product of two expressions.

# Examples

```
eval (Val 5)
--> 5

eval (Add (Val 3) (Val 4))
--> 3 + 4 = 7

eval (Mul (Add (Val 2) (Val 3)) (Val 4))
--> (2 + 3) * 4 = 20
```

# Starter Code

```haskell
module ExpressionEvaluator where

data Expr = Val Int
          | Add Expr Expr
          | Mul Expr Expr
          deriving (Show, Eq)

eval :: Expr -> Int
eval expr = undefined
```

# Sample Tests

```haskell
module ExpressionEvaluatorSpec where
import ExpressionEvaluator
import Test.Hspec

spec :: Spec
spec = do
  describe "Expression Evaluator" $ do
    it "evaluates a literal value" $ do
      eval (Val 10) `shouldBe` 10

    it "evaluates addition" $ do
      eval (Add (Val 5) (Val 3)) `shouldBe` 8

    it "evaluates multiplication" $ do
      eval (Mul (Val 6) (Val 7)) `shouldBe` 42

    it "evaluates nested expressions" $ do
      -- (2 + 3) * 4
      eval (Mul (Add (Val 2) (Val 3)) (Val 4)) `shouldBe` 20

    it "evaluates complex tree" $ do
      -- 2 + (3 * (4 + 5))
      eval (Add (Val 2) (Mul (Val 3) (Add (Val 4) (Val 5)))) `shouldBe` 29
```

# LLM Tests

```json
[
  {
    "name": "Pattern Matching",
    "form": "Verify that the solution uses pattern matching or case expressions on the Expr type."
  }
]
```
