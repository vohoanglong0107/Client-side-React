#!/usr/bin/env bash

set -e
set -x

pytest --cov=react_client_side --cov-report=term-missing react_client_side/tests "${@}"