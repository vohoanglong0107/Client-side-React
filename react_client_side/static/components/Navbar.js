import { AvatarOrDefault } from "../utils";

const Link = ReactRouterDOM.Link;
const { useState, useEffect } = React;

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

export default Navbar;