import Navbar from "../components/Navbar";
import { AvatarOrDefault } from "../utils";
import Post from "../components/Post";
const { useState, useEffect } = React;

const Home = () => {
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
    setDatas(posts);
  };

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

export default Home;
