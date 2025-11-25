#!/bin/bash
export GHC_ENVIRONMENT=$(find /app -name .ghc.environment* | head -n 1)
echo "Using GHC Environment: $GHC_ENVIRONMENT"
./runner-service
