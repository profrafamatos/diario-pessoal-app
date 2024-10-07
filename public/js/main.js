// main.js
import { setupLoginForm } from "./login.js";
import { postThought, loadThoughts } from "./thought.js";
import { getUsernameFromURL, displayUsername } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const thoughtForm = document.getElementById("thoughtForm");
  const logoutButton = document.getElementById("logoutButton");

  if (loginForm) {
    setupLoginForm();
  }

  if (thoughtForm) {
    const username = getUsernameFromURL();
    displayUsername(username);
    thoughtForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const thoughtInput = document.getElementById("thought"); // Referência à textarea
      const thought = thoughtInput.value; // Captura o valor atual
      await postThought(username, thought);
      loadThoughts();

      // Limpa a textarea e coloca o foco de volta nela
      thoughtInput.value = ""; // Limpa a textbox
      thoughtInput.focus(); // Foca na textbox
    });
    loadThoughts();
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      window.location.href = "/"; // Redireciona para a página de login
    });
  }
});
