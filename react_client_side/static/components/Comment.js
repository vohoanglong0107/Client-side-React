import { AvatarOrDefault } from "../utils";

const Comment = (props) => {
  const { avatar, content_type } = props.author.profile;
  const { username } = props.author;
  return (
    <div class="comment-container">
      <img
        src={AvatarOrDefault(avatar, content_type)}
        alt="avatar"
        class="comment-avatar"
      />
      <div class="comment-value">
        <p class="user-comment-username">{username}</p>
        <p class="comment-text">{props.body}</p>
      </div>
    </div>
  );
};

export default Comment;