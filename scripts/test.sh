#!/usr/bin/env bash

set -e
set -x

pytest --cov=python_final --cov-report=term-missing python_final/tests "${@}"