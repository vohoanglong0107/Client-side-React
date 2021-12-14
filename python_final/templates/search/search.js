const users_container = document.getElementById("users-container");

window.onload = function() {
    // const txtSearch = localStorage.getItem("txtSearch");
    // if (txtSearch !== "") {
    //     document.getElementsByClassName("search-bar").value = txtSearch;

    //     axios.post("...", {txtSearch: txtSearch}).then(res => {
    //         // Cần thống nhất với Long
    //         const listUser = res.data; 
    //         showSearchResult(listUser);
    //     }).catch(e => {
    //         console.log(e);
    //     });
    // }
    const listUser = [
        {
            id: 1,
            avatar: "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
            username: "Tuan Kiet",
            email: "tuankietnk2001@gmail.com",
            num_following: 50,
            num_followed: 100,
            is_followed: true,
        },
        {
            id: 2,
            avatar: "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
            username: "Hoang Long",
            email: "hoanglong@gmail.com",
            num_following: 50,
            num_followed: 100,
            is_followed: false
        }
    ]

    showSearchResult(listUser);
}

function showSearchResult(listUser) {
    listUser.forEach(user => {
        let userDiv = createUserDiv(user);
        users_container.appendChild(userDiv);
    });
}

function createUserDiv(user) {
    let userDiv = document.createElement('div');
    userDiv.classList.add("user-div");
    userDiv.id = user.id;

    // Avatar
    let avatar = document.createElement('img');
    avatar.classList.add("avatar");
    avatar.src = user.avatar;

    // Info div
    let userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add("user-info-div");

    let username = document.createElement('p');
    username.classList.add("user-info-bold");
    username.textContent = user.username;

    let email = document.createElement('p');
    email.classList.add("user-info");
    email.textContent = "Email: " + user.email;

    let num_following = document.createElement('p');
    num_following.classList.add("user-info");
    num_following.textContent = "Following " + user.num_following;

    let num_followed = document.createElement('p');
    num_followed.classList.add("user-info");
    num_followed.textContent = user.num_followed + " followed";

    userInfoDiv.appendChild(username);
    userInfoDiv.appendChild(email);
    userInfoDiv.appendChild(num_following);
    userInfoDiv.appendChild(num_followed);

    // Append child
    userDiv.appendChild(avatar);
    userDiv.appendChild(userInfoDiv);

    // Button follow/unfollow
    if (!user.is_followed) {
        let btn_follow = document.createElement('i');
        btn_follow.classList.add("fa");
        btn_follow.classList.add("fa-plus-circle");
        btn_follow.id = "btn-follow";
        userDiv.appendChild(btn_follow);
    } 

    return userDiv;
}

    