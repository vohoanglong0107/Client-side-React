#!/usr/bin/env bash

set -x

mypy react_client_side
black react_client_side --check
isort --check-only react_client_side
flake8 --max-line-length=88