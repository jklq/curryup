---
title: "Card Value"
difficulty: "Easy"
tags: ["Case Expressions", "Datatypes"]
---

# Instructions

We have defined two data types, `Suit` and `Rank`, to represent a standard deck of playing cards.
We also have a `Card` type that combines a `Rank` and a `Suit`.

Your task is to implement a function `handValue` that calculates the total numerical value of a list of cards.

The value of a card is determined by its `Rank`:

- `Numbered n`: The value is `n`.
- `Jack`, `Queen`, `King`: The value is 10.
- `Ace`: The value is 11.

The `Suit` does not affect the value.

# Examples

```
handValue [Card (Numbered 5) Hearts, Card Ace Spades]
--> 5 + 11 = 16

handValue [Card King Clubs, Card Queen Diamonds]
--> 10 + 10 = 20
```

# Starter Code

```haskell
module CardValue where

data Suit = Clubs | Diamonds | Hearts | Spades
  deriving (Show, Eq)

data Rank = Numbered Int | Jack | Queen | King | Ace
  deriving (Show, Eq)

data Card = Card Rank Suit
  deriving (Show, Eq)

handValue :: [Card] -> Int
handValue cards = undefined
```

# Sample Tests

```haskell
module CardValueSpec where
import CardValue
import Test.Hspec

spec :: Spec
spec = do
  describe "Card Value" $ do
    it "calculates value of numbered cards" $ do
      handValue [Card (Numbered 5) Hearts, Card (Numbered 3) Spades] `shouldBe` 8

    it "calculates value of face cards" $ do
      handValue [Card Jack Clubs, Card King Diamonds, Card Queen Hearts] `shouldBe` 30

    it "calculates value of Aces" $ do
      handValue [Card Ace Spades, Card Ace Clubs] `shouldBe` 22

    it "calculates mixed hand" $ do
      handValue [Card (Numbered 7) Diamonds, Card Jack Spades, Card Ace Hearts] `shouldBe` 28

    it "handles empty hand" $ do
      handValue [] `shouldBe` 0
```

# LLM Tests

```json
[
  {
    "name": "Case Expressions",
    "form": "Verify that the solution uses case expressions or pattern matching to handle the different Ranks."
  }
]
```
