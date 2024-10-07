// login.js
export async function loginUser(username, password) {
  return await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export function setupLoginForm() {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await loginUser(username, password);
      if (response.ok) {
        const data = await response.json();
        redirectToDiaryPage(data.username);
      } else {
        const data = await response.json();
        showError(data.message);
      }
    } catch (error) {
      showError("Erro ao se comunicar com o servidor.");
    }
  });
}

function redirectToDiaryPage(username) {
  window.location.href = `/diary?username=${username}`;
}

function showError(message) {
  document.getElementById("loginError").textContent = message;
}
