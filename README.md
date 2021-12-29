# Client side React App <!-- omit in toc -->
This is a small blog app, which maybe one of the worst React development and user experience, as all of the React side of this app is served uncompiled as static file using a flask backend.

## Contents of this Document <!-- omit in toc -->

- [Background](#background)
- [How to run it](#how-to-run-it)
- [How it works](#how-it-works)
- [Why React and Flask?](#why-react-and-flask)
- [Afterthoughts](#afterthoughts)

## Background
This app came up as a final assignment of my school Python course. As of the time, none of my group teammates were very good at programming in Python, let alone using Flask framework. So I came up with this idea of using React CDN so that the other members can try their best with React in form of pure html js css files, while I tried to link them to Flask side of the app. It was, well, not that pretty, and it was kinda cheated, but hey, it worked.

So if one day you find yourself in a situation like me, maybe this is the proof of concept you need.

## How to run it
Fist you need to set up the environment for the app by:
1. Installing poetry

```bash
    curl -sSL https://install.python-poetry.org | python3 -
```

2. Setup environments

```bash
    poetry install
```

3. Migrate (create database) using alembic:

```bash
    poetry run alembic upgrade head
```

This project was using SQLite as the main database, so no more setup is required.

After that, you can run it as a normal flask app.
```bash
    export FLASK_APP=react_client_side.main:app
    flask run --host 0.0.0.0
```

## How it works
As this is supposed to be a python project, not a node.js project, so no npm package, or is it? Turn out, we can install package into browser using CDN through `<script>` tag. As npm packages were not intended to be used this way, our choices are limited. Luckily, most essential ones (or so we thought) could be installed that way with little to no errors, so there we go, all that left was setting up babel standalone for browser to build React code, and a Flask server to serve all those as static files, as well as handle api call from React side.

## Why React and Flask?
So as I explained earlier, this was supposed to be a python project, and Flask was one of the requirements, but my teammates were inexperienced with python, so ...
In the early stage of this project, we actually tried to use pure js to render html page, but,  well.., it was kind a long story. Just by chance, I learned in other course that we actually can run React and React Dom on the browser. So, for a little bit better coding experience, we switched half-way to React and other helper libraries. You can still see those early stage lingering around the authenticate part of this project.

## Afterthoughts
Not until around the time of writing this documents did I find out about how to use import export on client side code, so all our React code was threw together in one big fat thick chunk of code.
Combined with git, merging each team members code was a nightmare.
It was during those time that I deeply understand the meaning of Separation of concerns.
I also renamed this project to current name, as the old name was to avoid my teacher's suspicious.