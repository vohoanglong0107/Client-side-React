#!/bin/sh -e
set -x

autoflake --remove-all-unused-imports --recursive --remove-unused-variables --in-place python_final --exclude=__init__.py
black python_final
isort python_final