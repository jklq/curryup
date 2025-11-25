---
title: "Rock Paper Scissors"
difficulty: "Easy"
tags: ["Data Types"]
---

# Instructions

Implement the logic for the game Rock, Paper, Scissors.
You are given a data type `Move` and a data type `Result`.
Write a function `play` that takes two moves (Player 1 and Player 2) and returns the result from Player 1's perspective.

Rules:

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock
- Same move is a Draw

## Examples

```
play Rock Scissors -> Win
play Rock Paper    -> Lose
play Rock Rock     -> Draw
```

# Starter Code

```haskell
module RockPaperScissors where

data Move = Rock | Paper | Scissors
  deriving (Eq, Show)

data Result = Win | Lose | Draw
  deriving (Eq, Show)

play :: Move -> Move -> Result
play p1 p2 = undefined
```

# Sample Tests

```haskell
module RockPaperScissorsSpec where
import RockPaperScissors
import Test.Hspec

spec :: Spec
spec = do
  describe "Rock Paper Scissors" $ do
    it "Rock beats Scissors" $ do
      play Rock Scissors `shouldBe` Win
    it "Scissors beats Paper" $ do
      play Scissors Paper `shouldBe` Win
    it "Paper beats Rock" $ do
      play Paper Rock `shouldBe` Win
    it "Lose cases" $ do
      play Scissors Rock `shouldBe` Lose
    it "Draw cases" $ do
      play Rock Rock `shouldBe` Draw
```

# LLM Tests

```json
[
  {
    "name": "Pattern Matching",
    "form": "Verify that the solution uses pattern matching on the Move types."
  }
]
```
