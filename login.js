// login.js

// Change credentials here:
const LOGIN_CREDENTIALS = {
  username: "admin",
  password: "NB@0707"
};

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (user === LOGIN_CREDENTIALS.username && pass === LOGIN_CREDENTIALS.password) {
    // Save session
    localStorage.setItem("authenticated", "true");
    window.location.href = "calculator.html"; // redirect to your calculator page
  } else {
    error.style.display = "block";
  }
}
