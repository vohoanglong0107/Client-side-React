#!/bin/sh -e
set -x

autoflake --remove-all-unused-imports --recursive --remove-unused-variables --in-place react_client_side --exclude=__init__.py
black react_client_side
isort react_client_side