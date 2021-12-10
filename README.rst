install poetry::

    curl -sSL https://install.python-poetry.org | python3 -


install deps::

    poetry install


create database::

    poetry run alembic upgrade head