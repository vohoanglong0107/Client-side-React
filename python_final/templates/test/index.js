const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const { useState, useEffect } = React;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + window.localStorage.getItem("token");

const URIForBase64AndContentType = (base64, contentType) => {
  return `data:${contentType};base64,${base64}`;
};

const defaultAvatar = "../assets/3135715.png";

const AvatarOrDefault = (avatar, content_type) => {
  if (avatar) return URIForBase64AndContentType(avatar, content_type);
  else return defaultAvatar;
};

const App = () => {
  return (
    <ReactRouterDOM.HashRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile/:userId" component={Profile} />
      <Route exact path="/search/:txtSearch" component={Search} />
    </ReactRouterDOM.HashRouter>
  );
};

const Navbar = () => {
  const [txtSearch, setTxtSearch] = useState("");
  const [avatar, setAvatar] = useState();
  const [userId, setUserId] = useState();
  const [contentType, setContentType] = useState();
  useEffect(async () => {
    axios.get("/api/v1/users/me").then((response) => {
      setAvatar(response.data.profile.avatar);
      setContentType(response.data.profile.content_type);
      setUserId(response.data.id);
    });
  }, []);
  return (
    <nav class="navbar navbar-expand-lg navContainer">
      <a class="navBrand" href="#">
        Blog
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control search-bar"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={txtSearch}
            onChange={(e) => setTxtSearch(e.target.value)}
          />
          <button class="btn my-2 my-sm-0 search-button" type="submit">
            <Link to={"/search/" + txtSearch}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </Link>
          </button>
        </form>
        <ul class="dropdown">
          <li>
            <button class="dropbtn profile-icon-button">
              <img
                src={AvatarOrDefault(avatar, contentType)}
                alt="user-icon"
                class="user-icon dropdown-toggle"
              />
            </button>
            <div class="dropdown-content">
              <Link to={"/profile/" + userId}>Profile</Link>
              <a href="/">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Home = () => {
  const username = "thanhcute";
  const [datas, setDatas] = useState([]);
  const [input, setInput] = useState("");
  const [avatar, setAvatar] = useState();
  const [contentType, setContentType] = useState();

  useEffect(() => {
    getPosts();
    axios.get("/api/v1/users/me").then((result) => {
      setAvatar(result.data.profile.avatar);
      setContentType(result.data.profile.content_type);
    });
  }, []);

  const getPosts = async () => {
    const posts = (await axios.get("/api/v1/posts/get")).data;
    console.log("posts", posts);
    setDatas(posts);
  };
  // TODO get posts

  const handleAddPost = async () => {
    if (input === "") return;
    let obj = {
      body: input,
    };
    await axios.post("/api/v1/posts/create", obj).then((res) => {
      setInput("");
    });
    getPosts();
  };

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

  return (
    <div class="container">
      <header>
        <Navbar />
      </header>
      <main>
        <div class="news">
          <img
            src={AvatarOrDefault(avatar, contentType)}
            alt="user-icon"
            class="user-avatar"
          />
          <input
            class="news-text"
            value={input}
            placeholder="What are you thinking?"
            onChange={(e) => setInput(e.target.value)}
          />
          <br />
          <button
            class="news-button"
            onClick={() => {
              handleAddPost();
            }}
          >
            Post
          </button>
        </div>
        <div>
          {datas.map((item) => {
            return (
              <Post
                key={item.id}
                author={item.author}
                postID={item.id}
                body={item.body}
                loves={item.heart_count}
                comments={item.comments}
                currentUser={{
                  currentUserAvatar: avatar,
                  currentUserContentType: contentType,
                }}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};
const Profile = (props) => {
  const userId = props.match.params.userId;
  const [isUser, setIsUser] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  useEffect(async () => {
    const currentUser = (await axios.get("/api/v1/users/me")).data;
    const profileUser = (await axios.get("/api/v1/users/" + userId)).data;

    if (currentUser.id == userId) {
      setIsUser(true);
    } else {
      setIsUser(false);
      const isFollowing = (
        await axios.get(`/api/v1/users/${userId}/isFollowing/`)
      ).data.msg;
      setIsFollowed(isFollowing);
    }

    setInputs({
      ...inputs,
      email: profileUser.email,
      username: profileUser.username,
    });
    setSelectedImageURL();
    setFollowers(profileUser.number_of_followers || 0);
    setFollowing(profileUser.number_of_following || 0);
    if (profileUser.profile.avatar)
      setSelectedImageURL(
        URIForBase64AndContentType(
          profileUser.profile.avatar,
          profileUser.profile.content_type
        )
      );
  }, [userId]);

  const handleUploadImage = async (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      setSelectedImageURL(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      alert("Error: ", error);
    };
  };
  const handleOnSubmit = async (event) => {
    const formData = new FormData();
    if (selectedImage)
      formData.append("avatar", selectedImage, selectedImage.name);
    if (inputs.username !== "") formData.append("username", inputs.username);
    if (inputs.email !== "") formData.append("email", inputs.email);
    if (inputs.password !== "") formData.append("password", inputs.password);

    let result = await axios.put("/api/v1/profiles/update", formData);
    setSelectedImageURL(
      URIForBase64AndContentType(result.data.avatar, result.data.content_type)
    );
  };
  const handleFollow = () => {
    if (isFollowed) {
      axios.post(`/api/v1/users/${userId}/unfollow/`).then((res) => {
        setIsFollowed(false);
        setFollowers(followers - 1);
      });
    } else {
      axios.post(`/api/v1/users/${userId}/follow/`).then((res) => {
        setIsFollowed(true);
        setFollowers(followers + 1);
      });
    }
  };

  return (
    <div class="body-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div class="info">
          <div class="img-div">
            <img
              alt="not fount"
              width={"250px"}
              class="image"
              src={selectedImageURL ? selectedImageURL : defaultAvatar}
            />

            <br />

            <label class="button-choose-file" for="myImage">
              Select a file
            </label>
            <input
              id="myImage"
              type="file"
              name="myImage"
              onChange={handleUploadImage}
            />
          </div>

          <form class="inputs-form" onSumit>
            <div class="inputs-field container">
              <div class="input-div row">
                <label class="labels col-4">Email:</label>
                <input
                  class="inputs col-8"
                  type="text"
                  placeholder="your email..."
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                />
              </div>
              <div class="input-div row">
                <label class="labels col-4">Username:</label>
                <input
                  class="inputs col-8"
                  type="text"
                  placeholder="your username..."
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </div>
              <div class="input-div row">
                <label class="labels col-4">Password:</label>
                <input
                  class="inputs col-8"
                  type="password"
                  placeholder="your password..."
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label class="follow">
                Followers: {followers}
                <i class="fa fa-user icon" aria-hidden="true"></i>
              </label>
              <label class="follow">
                Following: {following}
                <i class="fa fa-user icon" aria-hidden="true"></i>
              </label>
              {isUser ? (
                ""
              ) : (
                <button
                  onClick={handleFollow}
                  class={
                    isFollowed
                      ? "follow-button is-followed"
                      : "follow-button is-not-followed"
                  }
                >
                  {isFollowed ? <p>Followed</p> : <p>Follow</p>}
                </button>
              )}
            </div>
            {isUser && (
              <div class="buttons">
                <button
                  class="profile-button"
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </button>
                <button
                  class="profile-button"
                  style={{ backgroundColor: "#FDB827" }}
                  onClick={handleOnSubmit}
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

const Search = (props) => {
  const [listUser, setListUser] = useState([]);

  const txtSearch = props.match.params.txtSearch;

  useEffect(() => {
    axios
      .get("/api/v1/users/search/" + txtSearch)
      .then((res) => {
        console.log(res.data);
        setListUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [txtSearch]);

  return (
    <div class="body-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div id="users-container">
          {listUser.map((user) => {
            return (
              <Link to={"/profile/" + user.id}>
                <div class="user-div" id={user.id}>
                  <img
                    class="avatar"
                    src={AvatarOrDefault(
                      user.profile.avatar,
                      user.profile.content_type
                    )}
                  />
                  <div class="user-info-div">
                    <p class="user-info-bold">{user.username}</p>
                    <p class="user-info">Email: {user.email}</p>
                    <p class="user-info">
                      Following {user.number_of_following}
                    </p>
                    <p class="user-info">{user.number_of_followers} followed</p>
                  </div>
                  {/* {!user.is_followed && (
                    <i class="fa fa-plus-circle btn-follow" />
                  )} */}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
