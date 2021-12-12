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
    
    // TODO: send axios login request with email and password
    axios.post("...", {email: email, password: password}).then((res) => {
        if (res.data.message === 'Authentication successful!'){
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
            parent.location='...' // Link to home page
        }
        else {
            document.getElementById("password").value = ""
            alert(res.data.message);
        }
    }).catch(e => {
        console.log(e);
    })
})