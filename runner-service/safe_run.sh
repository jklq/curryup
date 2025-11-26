#!/bin/bash

# Set resource limits for the execution
# -t: CPU time (seconds)
# -v: Virtual memory (kbytes)
# -u: Max user processes

# Note: We use slightly higher limits than the strict Docker ones 
# to ensure the runtime itself has enough breathing room.

# CPU time limit (5 seconds) matches our context timeout
ulimit -t 5

# Virtual memory limit (~512MB) - GHC can be memory hungry
ulimit -v 524288

# Max processes (20) - enough for GHC runtime threads but prevents fork bombs
ulimit -u 20

# Execute the command passed as arguments
exec "$@"
