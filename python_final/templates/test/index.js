const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const { useState, useEffect } = React;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + window.localStorage.getItem("token");

const data = [
  {
    postID: 0,
    avatar: "",
    username: "thanhcute",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    loves: 2,
    comments: 2,
    commentText: [
      {
        avatar: "../assets/3135715.png",
        username: "thanhcute02",
        comment: "great Sum!",
      },
      {
        avatar: "../assets/3135715.png",
        username: "thanhcute01",
        comment: "nice",
      },
    ],
  },
  {
    postID: 1,
    avatar: "",
    username: "thanhcute02",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    loves: 0,
    comments: 0,
    commentText: [],
  },
  {
    postID: 2,
    avatar: "",
    username: "thanhcute03",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    loves: 12,
    comments: 4,
    commentText: [
      {
        avatar: "../assets/3135715.png",
        username: "thanhcute02",
        comment: "great Sum!",
      },
      {
        avatar: "../assets/3135715.png",
        username: "thanhcute03",
        comment: "great Sum! ayoooooooooooooooooo",
      },
      {
        avatar: "../assets/3135715.png",
        username: "thanhcute04",
        comment: "niceeeeeeeeeeeeeeeeeeeeeeeeeee",
      },
      {
        avatar: "../assets/3135715.png",
        username: "thanhcute05",
        comment: "great Summmmmmmmmmmmmmmmmmmmm!",
      },
    ],
  },
];

const App = () => {
  return (
    <ReactRouterDOM.HashRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
    </ReactRouterDOM.HashRouter>
  );
};

const Navbar = () => {
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
          />
          <button class="btn my-2 my-sm-0 search-button" type="submit">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
        <ul class="dropdown">
          <li>
            <button class="dropbtn profile-icon-button">
              <img
                src="../assets/3135715.png"
                alt="user-icon"
                class="user-icon dropdown-toggle"
              />
            </button>
            <div class="dropdown-content">
              <Link to="/profile">Profile</Link>
              <a href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Home = () => {
  const username = "thanhcute";
  const [datas, setDatas] = useState(data);
  const [input, setInput] = useState("");

  // const [ newPost, setNewPost ] = useState({
  // 	avatar: "",
  // 	username: "",
  // 	content: "",
  // 	loves: 0,
  // 	comments: 0,
  // 	comment: []
  // })

  const handleAddPost = async () => {
    let obj = {
      body: input,
    };
    axios.post("/api/post", obj).then((res) => {
      console.log(res);
      setInput("");
      window.location.reload();
    });
    // setDatas((prevData) => {
    //   return [...prevData, obj];
    // });
    // console.log(datas);
    setInput("");
  };

  const Post = (props) => {
    const [react, setReact] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showCmts, setShowCmts] = useState(false);
    const [numberOfLoves, setNumberOfLoves] = useState(props.loves);
    const [newComment, setNewComment] = useState("");
    const [numberOfComments, setNumberOfComments] = useState(props.comments);
    const [listComments, setListComments] = useState(props.commentText);
    const [count, setCount] = useState([]);
    useEffect(() => {
      console.log("run", showCmts);
    }, [count]);
    const handleHearted = (postID) => {
      console.log("postID", postID);

      datas.forEach((item) => {
        if (item.postID === postID) {
          !react ? (item.loves += 1) : (item.loves -= 1);
          setNumberOfLoves(item.loves);
        }
      });
    };
    const handleEnter = (event, postID) => {
      console.log("post id", postID);
      if (event.key === "Enter") {
        console.log("comment!");
        datas.forEach((item) => {
          console.log("go");
          if (item.postID === postID) {
            console.log("item post id", item.postID);
            item.comments += 1;
            setNumberOfComments(item.comments);
            setListComments((prevComments) => {
              return [...prevComments, newComment];
            });
          }
        });
      }
      setNewComment("");
    };

    const Comment = (props) => {
      return (
        <div class="comment-container">
          <img src={props.avatar} alt="avatar" class="comment-avatar" />
          <div class="comment-value">
            <p class="user-comment-username">{props.username}</p>
            <p class="comment-text">{props.comment}</p>
          </div>
        </div>
      );
    };
    return (
      <div class="post-container">
        <div class="ava-name">
          <img
            src="../assets/3135715.png"
            alt="user-avatar"
            class="user-avatar"
          />
          <p class="username">{props.username}</p>
        </div>
        <p class="content">
          <strong>{props.content}</strong>
        </p>
        <hr class="hr" />
        <div class="react">
          <button
            class={!react ? "react-button heart" : "react-button hearted"}
            onClick={() => {
              setReact(!react);
              handleHearted(props.postID);
            }}
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
              src="../assets/3135715.png"
              alt="avatar"
              class="comment-avatar"
            />
            <input
              placeholder="write comment..."
              class="comment-input"
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(event) => {
                handleEnter(event, props.postID);
              }}
            />

            {showCmts ? (
              <div class="list-cmts">
                {listComments.map((item) => {
                  return (
                    <Comment
                      comment={item.comment}
                      avatar={item.avatar}
                      username={item.username}
                    />
                  );
                })}
              </div>
            ) : (
              <label
                class="show-all-cmts"
                onClick={() => {
                  setShowCmts(true);
                  setCount((prevCount) => {
                    return [...prevCount, count + 1];
                  });
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
            src="../assets/3135715.png"
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
                username={item.username}
                postID={item.postID}
                commentText={item.commentText}
                content={item.content}
                loves={item.loves}
                comments={item.comments}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};
const Profile = () => {
  const [isUser, setIsUser] = useState(true);
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
    setInputs({
      ...inputs,
      email: currentUser.email,
      username: currentUser.username,
    });
    setFollowers(currentUser.number_of_followers || 0);
    setFollowing(currentUser.number_of_following || 0);
  }, []);

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
    formData.append("avatar", selectedImage, selectedImage.name);
    if (inputs.username !== "") formData.append("username", inputs.username);
    if (inputs.email !== "") formData.append("email", inputs.email);
    if (inputs.password !== "") formData.append("password", inputs.password);

    let result = await axios.put("/api/v1/profiles/update", formData);
    setSelectedImageURL(
      `data:${result.data.content_type};base64,${result.data.avatar}`
    );
  };

  return (
    <div class="body-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div class="info">
          <div class="img-div">
            {selectedImageURL && (
              <img
                alt="not fount"
                width={"250px"}
                class="image"
                src={selectedImageURL}
              />
            )}
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

          <form class="inputs-form">
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
                  onClick={() => setIsFollowed(!isFollowed)}
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
            <div class="buttons">
              <button
                class="profile-button"
                onsubmit={() => window.location.reload()}
              >
                Cancel
              </button>
              <button
                class="profile-button"
                style={{ backgroundColor: "#FDB827" }}
                onsubmit={handleOnSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
