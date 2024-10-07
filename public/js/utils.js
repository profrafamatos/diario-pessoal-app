// utils.js
function getUsernameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("username");
}

function displayUsername(username) {
  document.getElementById(
    "usernameDisplay"
  ).textContent = `Bem-vindo, ${username}`;
}

module.exports = { getUsernameFromURL, displayUsername };
