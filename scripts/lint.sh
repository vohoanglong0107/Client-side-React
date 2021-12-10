#!/usr/bin/env bash

set -x

mypy python_final
black python_final --check
isort --check-only python_final
flake8 --max-line-length=88