const forgotPasswordForm = document.getElementById("forgotPasswordForm");

function showForgotPassword() {
    forgotPasswordForm.classList.remove("hidden");
}

function closeForgotPassword() {
    forgotPasswordForm.classList.add("hidden");
}