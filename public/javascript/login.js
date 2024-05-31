const passwordInput1 = document.getElementById("passwordInput");
const toggleVisibility = document.getElementById("show");

toggleVisibility.addEventListener("click", function() {
  if (passwordInput.type == "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
  
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
      var alertElement = document.querySelector('.msg');
      if (alertElement) {
          alertElement.classList.remove('show');
          alertElement.classList.add('fade');
      }
  }, 3000);
});