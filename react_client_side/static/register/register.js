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
    axios.post("/api/v1/users/register", {username: username, email: email, password: password, role_id: 2}).then((res) => {
        if (res.status === 200){
            parent.location='/' // Link to login page
        }
        else {
            resetInput();
            alert(res.data.msg);
        }
    }).catch(e => {
        console.log(e);
        alert(e.response.data.msg);
    })
});

function resetInput() {
    document.getElementById("username").value = ""
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("confirmPassword").value = ""
}