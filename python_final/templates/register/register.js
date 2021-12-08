const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", e => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password !== confirmPassword){
        alert("Confirm password not match!");
        document.getElementById("password").value = ""
        document.getElementById("confirmPassword").value = ""
        return;
    }
    
    // TODO: send axios signup request with username, email and password
    axios.post("...", {username: username, email: email, password: password}).then((res) => {
        if (res.data.message === 'Register successful!'){
            axios.defaults.headers.common['Authorization'] = res.data.token;
            parent.location='/templates/auth/login.html' // Link to login page
        }
        else {
            resetInput();
            alert(res.data.message);
        }
    }).catch(e => {
        console.log(e);
    })
});

function resetInput() {
    document.getElementById("username").value = ""
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("confirmPassword").value = ""
}