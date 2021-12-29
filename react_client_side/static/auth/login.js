const loginForm = document.getElementById("loginForm");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

function showForgotPassword() {
    forgotPasswordForm.classList.remove("hidden");
}

function closeForgotPassword() {
    forgotPasswordForm.classList.add("hidden");
}

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    axios.post("/api/v1/login/access-token", {username: email, password: password}).then((res) => {
        if (res.status === 200){
            localStorage.setItem('token', res.data.access_token);
            parent.location='/home' // Link to home page
        }
        else {
            document.getElementById("password").value = ""
            alert(res.data.msg);
        }
    }).catch(e => {
        console.log(e);
        alert(e.response.data.msg);
    })
})