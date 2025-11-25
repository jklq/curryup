module DigitalRoot where

digitalRoot :: Int -> Int
digitalRoot = until (< 10) (foldr ((+) . read . (: [])) 0 . show)
