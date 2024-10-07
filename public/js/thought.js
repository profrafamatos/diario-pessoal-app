// thoughts.js
export async function postThought(username, text) {
  if (!text) return;

  const response = await fetch("/thought", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, text }),
  });

  if (!response.ok) {
    console.error("Erro ao adicionar o pensamento.");
  }
}

export async function loadThoughts() {
  try {
    const response = await fetch("/thoughts");
    const thoughts = await response.json();
    renderThoughtsList(thoughts);
  } catch (error) {
    console.error("Erro ao carregar pensamentos:", error);
  }
}

export function logout() {
  localStorage.removeItem('authToken'); // Exemplo de remoção de token armazenado no localStorage
  window.location.href = 'index.html';
}

function renderThoughtsList(thoughts) {
  const thoughtsList = document.getElementById("thoughtsList");
  thoughtsList.innerHTML = ""; // Limpa a lista antes de renderizar

  thoughts.forEach((thought) => {
    const thoughtItem = createThoughtItem(thought);
    thoughtsList.appendChild(thoughtItem);
  });

  setupDeleteIcons();
}

function createThoughtItem(thought) {
  const thoughtItem = document.createElement("div");
  const thoughtId = thought.id || thought._id;

  thoughtItem.classList.add("thought-item");
  thoughtItem.innerHTML = `
      ${thought.username}: ${thought.text}
      <i class="fas fa-trash delete-icon" data-id="${thoughtId}" title="Excluir pensamento"></i>
    `;

  return thoughtItem;
}

async function deleteThought(thoughtId) {
  if (!thoughtId) return;

  const response = await fetch(`/thought/${thoughtId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error("Erro ao excluir o pensamento.");
  }
}

function setupDeleteIcons() {
  const deleteIcons = document.querySelectorAll(".delete-icon");
  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", async (e) => {
      const thoughtId = e.target.getAttribute("data-id");
      await deleteThought(thoughtId);
      loadThoughts(); // Recarrega a lista após a exclusão
    });
  });
}


