---
title: "File System Search"
difficulty: "Hard"
tags: ["Trees", "Recursion"]
---

# Instructions

You are given a recursive data type representing a file system.

```haskell
data FileSystem = File String | Directory String [FileSystem]
  deriving (Show, Eq)
```

Write a function `findFile :: String -> FileSystem -> Maybe [String]` that searches for a file by name.
If the file is found, return `Just path`, where `path` is a list of directory names leading to the file, including the file name itself.
If the file is not found, return `Nothing`.
If there are multiple files with the same name, return the path to the first one found (order in the list).

## Examples

```haskell
fs = Directory "root"
  [ File "config.txt"
  , Directory "home"
      [ Directory "user"
          [ File "todo.txt" ]
      ]
  ]

findFile "todo.txt" fs
-> Just ["root", "home", "user", "todo.txt"]

findFile "missing.txt" fs
-> Nothing
```

# Starter Code

```haskell
module FileSystemSearch where

data FileSystem = File String | Directory String [FileSystem]
  deriving (Show, Eq)

findFile :: String -> FileSystem -> Maybe [String]
findFile target fs = undefined
```

# Sample Tests

```haskell
module FileSystemSearchSpec where
import FileSystemSearch
import Test.Hspec

spec :: Spec
spec = do
  describe "File System Search" $ do
    let fs = Directory "root"
              [ File "config.txt"
              , Directory "home"
                  [ Directory "user"
                      [ File "todo.txt" ]
                  ]
              ]

    it "finds a file at the top level" $ do
      findFile "config.txt" fs `shouldBe` Just ["root", "config.txt"]

    it "finds a nested file" $ do
      findFile "todo.txt" fs `shouldBe` Just ["root", "home", "user", "todo.txt"]

    it "returns Nothing for missing file" $ do
      findFile "missing.txt" fs `shouldBe` Nothing

    it "finds file in root directory if it matches" $ do
        let simpleFs = File "simple.txt"
        findFile "simple.txt" simpleFs `shouldBe` Just ["simple.txt"]
```

# LLM Tests

```json
[
  {
    "name": "Recursive Search",
    "form": "Verify that the solution recursively searches through directories."
  }
]
```
