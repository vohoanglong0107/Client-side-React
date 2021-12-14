import base64
from python_final.models.posts import Post
from python_final.models.profiles import Profile
from python_final.models.users import User
from python_final.models.roles import Role
from python_final.models.comments import Comment
from python_final.core.security import get_password_hash


def get_role_by_name(name, db_session):
    role = db_session.query(Role).filter(Role.name == name).first()
    return role


def get_role_by_id(role_id, db_session):
    role = db_session.query(Role).filter(Role.id == role_id).first()
    return role


def create_role(name, db_session):
    role = Role(name=name)
    db_session.add(role)
    db_session.commit()
    return role


def get_roles(db_session):
    return db_session.query(Role).all()


def get_user_roles(user):
    return user.role


def get_user(identity, db_session):
    return db_session.query(User).filter(User.id == identity).first()


def get_user_by_email(email, db_session) -> User:
    user = db_session.query(User).filter(User.email == email).first()  # type: User
    return user


def get_user_contain_email(email, db_session):
    user = db_session.query(User).filter(User.email.contains(email)).first()
    return user


def get_user_contain_username(username, db_session):
    user = db_session.query(User).filter(User.username.contains(username)).first()
    return user


def get_user_by_username(username, db_session) -> User:
    user = (
        db_session.query(User).filter(User.username == username).first()
    )  # type: User
    return user


def get_user_by_id(user_id, db_session):
    user = db_session.query(User).filter(User.id == user_id).first()  # type: User
    return user


def get_user_hashed_password(user):
    return user.password_hash


def get_user_id(user):
    return user.id


def get_users(db_session):
    return db_session.query(User).all()


def get_followers_by_user_id(db_session, user_id):
    return db_session.query(User).filter(User.id == user_id).first().followers.all()


def get_following_by_user_id(db_session, user_id):
    return db_session.query(User).filter(User.id == user_id).following.all()


def create_user(db_session, username, email, password, role_id):
    user = User(
        username=username,
        email=email,
        password_hash=get_password_hash(password),
        role_id=role_id,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    profile = Profile(
        id=user.id,
        fullname="",
        location="",
        about_me="",
    )
    db_session.add(profile)
    db_session.commit()
    return user


def get_profile_by_id(db_session, user_id) -> Profile:
    return db_session.query(Profile).filter(Profile.id == user_id).first()


def update_profile_by_id(
    db_session, user_id, username, email, password, role_id, avatar
):
    avatar_bytes = base64.b64encode(avatar.read()) if avatar else None
    content_type = avatar.content_type if avatar else None
    profile = get_profile_by_id(db_session, user_id)
    if username is not None:
        profile.username = username
    if email is not None:
        profile.email = email
    if password is not None:
        profile.password_hash = get_password_hash(password)
    if role_id is not None:
        profile.role_id = role_id
    if avatar_bytes is not None:
        profile.avatar = avatar_bytes
    if content_type is not None:
        profile.content_type = content_type
    db_session.commit()
    db_session.refresh(profile)
    return profile


def create_post(db_session, body, author_id):
    post = Post(
        body=body,
        author_id=author_id,
    )
    db_session.add(post)
    db_session.commit()
    db_session.refresh(post)
    return post


def update_post(db_session, post_id, body):
    post = Post(
        id=post_id,
        body=body,
    )
    db_session.add(post)
    db_session.commit()
    db_session.refresh(post)
    return post


def get_post_by_user_id(db_session, author_id) -> Post:
    return db_session.query(Post).filter(Post.author_id == author_id).all()


def get_post_for_user_id(db_session, user_id) -> Post:
    following = db_session.query(User).filter(User.id == user_id).first().following
    return db_session.query(Post).filter(Post.author_id.in_(following)).all()


def delete_post(db_session, post_id) -> Post:
    post = db_session.query(Post).get(post_id)
    db_session.delete(post)
    db_session.commit()
    return post


def heart_post(db_session, post_id):
    post = get_profile_by_id(db_session, post_id)
    post.heart_count += 1
    db_session.commit()
    db_session.refresh(post)
    return post


def unheart_post(db_session, post_id):
    post = get_profile_by_id(db_session, post_id)
    post.heart_count -= 1
    db_session.commit()
    db_session.refresh(post)
    return post


def create_comment(db_session, body, post_id, author_id):
    comment = Comment(
        body=body,
        post_id=post_id,
        author_id=author_id,
    )
    db_session.add(comment)
    db_session.commit()
    db_session.refresh(comment)
    return comment


def update_comment(db_session, comment_id, body):
    comment = Comment(
        id=comment_id,
        body=body,
    )
    db_session.add(comment)
    db_session.commit()
    db_session.refresh(comment)
    return comment


def get_comment_by_post_id(db_session, post_id) -> Comment:
    return db_session.query(Comment).filter(Comment.post_id == post_id).all()


def delete_comment(db_session, comment_id) -> Comment:
    comment = db_session.query(Comment).get(comment_id)
    db_session.delete(comment)
    db_session.commit()
    return comment


def follow_user_by_id(db_session, user_id, follower_id):
    user = get_user_by_id(user_id, db_session)
    follower = get_user_by_id(follower_id, db_session)
    user.followers.append(follower)
    db_session.commit()
    return user


def unfollow_user_by_id(db_session, user_id, follower_id):
    user = get_user_by_id(user_id, db_session)
    follower = get_user_by_id(follower_id, db_session)
    user.followers.remove(follower)
    db_session.commit()
    return user
