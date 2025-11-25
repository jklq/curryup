---
title: "Tic-Tac-Toe Winner"
difficulty: "Hard"
tags: ["Lists"]
---

# Instructions

You are given a 3x3 Tic-Tac-Toe board represented as a list of lists `[[Maybe Mark]]`, where `Mark` is either `X` or `O`. `Nothing` represents an empty square.

Write a function `winner` that determines if there is a winner.
Return `Just X` if X wins, `Just O` if O wins, and `Nothing` if there is no winner yet or it's a draw.

A winner is defined as 3 of the same marks in a row, column, or diagonal.

## Examples

```haskell
board1 = [ [Just X, Just O, Nothing]
         , [Just X, Just X, Just O]
         , [Just O, Nothing, Just X] ]
-- X wins (diagonal)
winner board1 -> Just X

board2 = [ [Just X, Just O, Just X]
         , [Just O, Just O, Just X]
         , [Just O, Just X, Just O] ]
-- No winner
winner board2 -> Nothing
```

# Starter Code

```haskell
module TicTacToeWinner where

data Mark = X | O deriving (Eq, Show)
type Board = [[Maybe Mark]]

winner :: Board -> Maybe Mark
winner board = undefined
```

# Sample Tests

```haskell
module TicTacToeWinnerSpec where
import TicTacToeWinner
import Test.Hspec

spec :: Spec
spec = do
  describe "Tic-Tac-Toe Winner" $ do
    it "detects row winner" $ do
      let b = [[Just X, Just X, Just X], [Nothing, Nothing, Nothing], [Nothing, Nothing, Nothing]]
      winner b `shouldBe` Just X

    it "detects column winner" $ do
      let b = [[Just O, Nothing, Nothing], [Just O, Nothing, Nothing], [Just O, Nothing, Nothing]]
      winner b `shouldBe` Just O

    it "detects diagonal winner" $ do
      let b = [[Just X, Nothing, Nothing], [Nothing, Just X, Nothing], [Nothing, Nothing, Just X]]
      winner b `shouldBe` Just X

    it "returns Nothing for no winner" $ do
      let b = [[Just X, Just O, Just X], [Just O, Just X, Just O], [Just O, Just X, Just O]]
      winner b `shouldBe` Nothing
```

# LLM Tests

```json
[
  {
    "name": "Check All Lines",
    "form": "Verify that the solution checks rows, columns, and diagonals."
  }
]
```
