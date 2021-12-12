"""first revision with all schemes

Revision ID: 772a78831830
Revises: 
Create Date: 2021-12-09 12:00:27.646127

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "772a78831830"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    role_table = op.create_table(
        "Role",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("permission", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.bulk_insert(role_table, [
        {"name": "Anonymous", "permission": 0x01},
        {"name": "User", "permission": 0x07},
        {"name": "Moderator", "permission": 0x0f},
        {"name": "Administrator", "permission": 0x1f},
    ])
    op.create_table(
        "User",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("username", sa.String(), nullable=False),
        sa.Column("password_hash", sa.String(), nullable=False),
        sa.Column("role_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["role_id"], ["Role.id"],),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "Post",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("content", sa.String(), nullable=False),
        sa.Column("author_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["author_id"], ["User.id"],),
        sa.PrimaryKeyConstraint("id"),
    )
    # TODO: add like and heart
    op.create_table(
        "Comment",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("body", sa.String(), nullable=False),
        sa.Column("timestamp", sa.TIMESTAMP(), server_default=sa.func.now(), onupdate=sa.func.now()),
        sa.Column("author_id", sa.Integer(), nullable=False),
        sa.Column("post_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["author_id"], ["User.id"],),
        sa.ForeignKeyConstraint(["post_id"], ["Post.id"],),
        sa.PrimaryKeyConstraint("id"),
    )
    # TODO: add like and heart
    op.create_table(
        "Follow",
        sa.Column("follower_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["follower_id"], ["User.id"],),
        sa.Column("following_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["following_id"], ["User.id"],),
    )
    op.create_table(
        "Profile",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("fullname", sa.String(), nullable=False),
        sa.Column("location", sa.String(), nullable=False),
        sa.Column("about_me", sa.String(), nullable=False),
        sa.Column("member_since", sa.TIMESTAMP(), server_default=sa.func.now()),
        sa.Column("last_seen", sa.TIMESTAMP(), server_default=sa.func.now()),
    )


def downgrade():
    op.drop_table("Role")
    pass
