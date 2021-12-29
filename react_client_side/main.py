# Import installed packages
from flask import Flask, send_from_directory
from pathlib import Path
import os

# Import app code
app = Flask(__name__, static_url_path='')

# Setup app
from .core import app_setup  # noqa
print(Path('.').absolute())

@app.route('/')
def send_home():
    return send_from_directory(Path('.') / 'static' / 'auth', 'login.html')

@app.route('/home')
def send_login():
    return send_from_directory(Path('.') / 'static', 'index.html')

@app.route('/register')
def send_register():
    return send_from_directory(Path('.') / 'static' / 'register', 'register.html')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)