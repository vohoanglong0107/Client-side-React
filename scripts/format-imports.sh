#!/bin/sh -e
set -x

# Sort imports one per line, so autoflake can remove unused imports
isort  --force-single-line-imports --skip __init__.py react_client_side
sh ./scripts/format.sh