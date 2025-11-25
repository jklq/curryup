---
title: "Word Frequency"
difficulty: "Medium"
tags: ["Maps", "Lists"]
---

# Instructions

Write a function `wordFrequency` that takes a list of strings and returns a `Map` where the keys are the strings and the values are the number of times they appear in the list.

You will need to import `Data.Map` (usually qualified as `Map`).

## Examples

```
wordFrequency ["apple", "banana", "apple", "cherry", "banana", "banana"]
-> Map.fromList [("apple", 2), ("banana", 3), ("cherry", 1)]
```

# Starter Code

```haskell
module WordFrequency where

import qualified Data.Map as Map
import Data.Map (Map)

wordFrequency :: [String] -> Map String Int
wordFrequency words = undefined
```

# Sample Tests

```haskell
module WordFrequencySpec where
import WordFrequency
import qualified Data.Map as Map
import Test.Hspec

spec :: Spec
spec = do
  describe "Word Frequency" $ do
    it "counts words correctly" $ do
      let input = ["a", "b", "a", "c", "b", "b"]
      let expected = Map.fromList [("a", 2), ("b", 3), ("c", 1)]
      wordFrequency input `shouldBe` expected
    it "handles empty list" $ do
      wordFrequency [] `shouldBe` Map.empty
```

# LLM Tests

```json
[
  {
    "name": "Map Usage",
    "form": "Verify that the solution uses Data.Map functions like insertWith or fromListWith."
  }
]
```
