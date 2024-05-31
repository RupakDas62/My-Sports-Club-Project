const passwordInput1 = document.getElementById("pass1");
const passwordInput2 = document.getElementById("pass2");
const toggleVisibility1 = document.getElementById("show1");
const toggleVisibility2 = document.getElementById("show2");
const btn = document.getElementById("btn-signup");
const disable1 = document.getElementById("disable1");
const disable2 = document.getElementById("disable2");


toggleVisibility1.addEventListener("click", function() {
  if (passwordInput1.type == "password") {
    passwordInput1.type = "text";
  } else {
    passwordInput1.type = "password";
  }
});
toggleVisibility2.addEventListener("click", function() {
    if (passwordInput2.type == "password") {
      passwordInput2.type = "text";
    } else {
      passwordInput2.type = "password";
    }
  });

  btn.addEventListener('click', function(e) {
    if(passwordInput1.value !== passwordInput2.value) {
      e.preventDefault();
      disable1.style.display = "inline";
      disable2.style.display = "inline";
    }else {
      console.log("page reloaded");
      disable1.style.display = "none";
      disable2.style.display = "none";
    }
  })
  
  