import Navbar from "../components/Navbar";
import { AvatarOrDefault } from "../utils";

const Link = ReactRouterDOM.Link;
const { useState, useEffect } = React;

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

export default Search;