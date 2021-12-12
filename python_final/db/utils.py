from python_final.models.posts import Post
from python_final.models.users import User
from python_final.models.roles import Role
from python_final.models.comments import Comment
from python_final.core.security import get_password_hash


def get_user(identity, db_session):
    return db_session.query(User).filter(User.id == identity).first()


def check_if_user_is_active(user):
    return user.is_active


def check_if_user_is_superuser(user):
    return user.is_superuser


def check_if_username_is_active(username, db_session):
    user = get_user(username, db_session)
    return check_if_user_is_active(user)


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


def get_user_by_email(email, db_session) -> User:
    user = db_session.query(User).filter(User.email == email).first()  # type: User
    return user


def get_user_by_username(username, db_session) -> User:
    user = db_session.query(User).filter(User.username == username).first()  # type: User
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


def create_user(
    db_session, username, email, password, role_id
):
    user = User(
        username=username,
        email=email,
        password_hash=get_password_hash(password),
        role_id=role_id
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


def create_post(
    db_session, body, author_id
):
    post = Post(
        body=body,
        author_id=author_id,
    )
    db_session.add(post)
    db_session.commit()
    db_session.refresh(post)
    return post


def update_post(
    db_session, post_id, body
):
    post = Post(
        id=post_id,
        body=body,
    )
    db_session.add(post)
    db_session.commit()
    db_session.refresh(post)
    return post


def get_post_by_user_id(
    db_session, author_id
) -> Post:
    return db_session.query(Post).filter(Post.author_id == author_id).all()


def delete_post(
    db_session, post_id
) -> Post:
    post = db_session.query(Post).get(post_id)
    db_session.delete(post)
    db_session.commit()
    return post


def create_comment(
    db_session, body, post_id, author_id
):
    comment = Comment(
        body=body,
        post_id=post_id,
        author_id=author_id,
    )
    db_session.add(comment)
    db_session.commit()
    db_session.refresh(comment)
    return comment


def update_comment(
    db_session, comment_id, body
):
    comment = Comment(
        id=comment_id,
        body=body,
    )
    db_session.add(comment)
    db_session.commit()
    db_session.refresh(comment)
    return comment


def get_comment_by_post_id(
    db_session, post_id
) -> Comment:
    return db_session.query(Comment).filter(Comment.post_id == post_id).all()


def delete_comment(
    db_session, comment_id
) -> Comment:
    comment = db_session.query(Comment).get(comment_id)
    db_session.delete(comment)
    db_session.commit()
    return comment


def assign_role_to_user(role: Role, user: User, db_session):
    user.roles.append(role)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user