from hashlib import blake2b
from hmac import compare_digest

from react_client_side.core import config

def verify_password(plain_password, hashed_password):
    return compare_digest(get_password_hash(plain_password), hashed_password)


def get_password_hash(password):
    h = blake2b(key=config.SECRET_KEY.encode('utf-8'), digest_size=32)
    h.update(password.encode('utf-8'))
    return h.hexdigest()