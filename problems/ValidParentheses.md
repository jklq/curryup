---
title: "Valid Parentheses"
difficulty: "Medium"
tags: ["Strings", "Stacks"]
---

# Instructions

Write a function `validParentheses` that takes a string of parentheses, and determines if the order of the parentheses is valid. The function should return `True` if the string is valid, and `False` if it's invalid.

The input may contain open `(` and close `)` parentheses.

## Examples

```
"()"              =>  True
")(()))"          =>  False
"("               =>  False
"(())((()())())"  =>  True
```

# Starter Code

```haskell
module ValidParentheses where

validParentheses :: String -> Bool
validParentheses s = undefined
```

# Sample Tests

```haskell
module ValidParenthesesSpec where
import ValidParentheses
import Test.Hspec

spec :: Spec
spec = do
  describe "Valid Parentheses" $ do
    it "returns True for valid simple pair" $ do
      validParentheses "()" `shouldBe` True
    it "returns False for invalid simple pair" $ do
      validParentheses ")(" `shouldBe` False
    it "returns True for nested parentheses" $ do
      validParentheses "(())" `shouldBe` True
    it "returns False for unbalanced parentheses" $ do
      validParentheses "(()" `shouldBe` False
    it "returns True for empty string" $ do
      validParentheses "" `shouldBe` True
```

# LLM Tests

```json
[
  {
    "name": "Stack or Counter",
    "form": "Check if the user used a counter or a stack approach."
  }
]
```
