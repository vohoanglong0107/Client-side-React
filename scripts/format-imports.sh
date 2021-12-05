#!/bin/sh -e
set -x

# Sort imports one per line, so autoflake can remove unused imports
isort  --force-single-line-imports --skip __init__.py app
sh ./scripts/format.sh