// utils.js
export function getUsernameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("username");
}

export function displayUsername(username) {
  document.getElementById(
    "usernameDisplay"
  ).textContent = `Bem-vindo, ${username}`;
}
