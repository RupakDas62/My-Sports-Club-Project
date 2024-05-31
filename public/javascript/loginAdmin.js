const passwordInput1 = document.getElementById("passwordInput");
const toggleVisibility = document.getElementById("show");

toggleVisibility.addEventListener("click", function() {
  if (passwordInput.type == "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
  