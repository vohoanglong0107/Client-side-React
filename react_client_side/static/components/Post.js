import { AvatarOrDefault } from "../utils";
import Comment from "./Comment";
const { useState, useEffect } = React;

const Post = (props) => {
  const { currentUserAvatar, currentUserContentType } = props.currentUser;
  const { avatar, content_type } = props.author.profile;
  const { username } = props.author;
  const { postID } = props;
  const [react, setReact] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showCmts, setShowCmts] = useState(false);
  const [numberOfLoves, setNumberOfLoves] = useState(props.loves);
  const [newComment, setNewComment] = useState("");
  const [numberOfComments, setNumberOfComments] = useState(
    props.comments.length
  );
  const [listComments, setListComments] = useState(props.comments);

  const handleHearted = () => {
    console.log("postID", postID);
    if (react) {
      axios.delete(`/api/v1/posts/react/${postID}`).then((res) => {
        setReact(false);
        setNumberOfLoves(numberOfLoves - 1);
      });
    } else {
      axios.post(`/api/v1/posts/react/${postID}`).then((res) => {
        setReact(true);
        setNumberOfLoves(numberOfLoves + 1);
      });
    }
  };
  const handleEnter = (event) => {
    console.log("post id", postID);
    if (event.key === "Enter") {
      console.log("comment!");
      if (newComment === "") return;
      axios
        .post(`/api/v1/comments/create/${postID}`, {
          body: newComment,
        })
        .then((res) => {
          setNewComment("");
          setNumberOfComments(numberOfComments + 1);
          setListComments([...listComments, res.data]);
        });
    }
  };

  return (
    <div class="post-container">
      <div class="ava-name">
        <img
          src={AvatarOrDefault(avatar, content_type)}
          alt="user-avatar"
          class="user-avatar"
        />
        <p class="username">{username}</p>
      </div>
      <p class="content">
        <strong>{props.body}</strong>
      </p>
      <hr class="hr" />
      <div class="react">
        <button
          class={!react ? "react-button heart" : "react-button hearted"}
          onClick={handleHearted}
        >
          <i class="fa fa-heart-o react-icon" aria-hidden="true"></i>
          {numberOfLoves}
          <strong class="react-text">Love</strong>
        </button>
        <button class="react-button comment" onClick={() => setVisible(true)}>
          <i class="fa fa-commenting-o react-icon" aria-hidden="true"></i>
          {numberOfComments}
          <strong class="react-text">Comment</strong>
        </button>
      </div>
      <hr class="hr" />
      {visible ? (
        <div class="comment-div">
          <img
            src={AvatarOrDefault(currentUserAvatar, currentUserContentType)}
            alt="avatar"
            class="comment-avatar"
          />
          <input
            placeholder="write comment..."
            class="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleEnter}
          />

          {showCmts ? (
            <div class="list-cmts">
              {listComments.map((item) => {
                return <Comment body={item.body} author={item.author} />;
              })}
            </div>
          ) : (
            <label
              class="show-all-cmts"
              onClick={() => {
                setShowCmts(true);
                console.log("showCmts", showCmts);
              }}
            >
              <p>Show all comments</p>
            </label>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;