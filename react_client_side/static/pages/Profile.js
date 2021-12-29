import { URIForBase64AndContentType } from "../utils";
import { defaultAvatar } from "../constants";
import Navbar from "../components/Navbar";
const { useState, useEffect } = React;
const Profile = (props) => {
  const userId = props.match.params.userId;
  const [isUser, setIsUser] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [inputs, setInputs] = useState({
    fullname: "",
    location: "",
    about_me: "",
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
      fullname: profileUser.profile.fullname,
      location: profileUser.profile.location,
      about_me: profileUser.profile.about_me,
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
    formData.append("fullname", inputs.fullname);
    formData.append("location", inputs.location);
    formData.append("about_me", inputs.about_me);

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
                <label class="labels col-4">Fullname:</label>
                <input
                  class="inputs col-8"
                  type="text"
                  placeholder="your fullname..."
                  value={inputs.fullname}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullname: e.target.value })
                  }
                />
              </div>
              <div class="input-div row">
                <label class="labels col-4">Location:</label>
                <input
                  class="inputs col-8"
                  type="text"
                  placeholder="your location..."
                  value={inputs.location}
                  onChange={(e) =>
                    setInputs({ ...inputs, location: e.target.value })
                  }
                />
              </div>
              <div class="input-div row">
                <label class="labels col-4">About me:</label>
                <input
                  class="inputs col-8"
                  type="text"
                  placeholder="About me..."
                  value={inputs.about_me}
                  onChange={(e) =>
                    setInputs({ ...inputs, about_me: e.target.value })
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

export default Profile;