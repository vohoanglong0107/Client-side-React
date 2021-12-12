# Import installed packages
from flask import Flask, send_from_directory
from pathlib import Path
import os

# Import app code
app = Flask(__name__, static_folder='templates', static_url_path='')

# Setup app
from .core import app_setup  # noqa
print(Path('.').absolute())

@app.route('/')
def send_js():
    return send_from_directory(Path('.') / 'templates' / 'test', 'index.html')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)