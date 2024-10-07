// thoughts.js
export async function postThought(username, text) {
  if (!text) return;

  const response = await fetch("/thought", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, text }),
  });

  if (!response.ok) {
    return "Erro ao adicionar o pensamento.";
  }

  return "Pensamento adicionado com sucesso.";
}

export async function loadThoughts() {
  try {
    const response = await fetch("/thoughts");

    if (!response.ok) {
      return null; // Se a resposta não for ok, retorna null
    }

    const thoughts = await response.json();
    return thoughts; // Retorna os pensamentos
  } catch (error) {
    return null; // Retorna null se houver erro
  }
}

export function logout() {
  localStorage.removeItem("authToken"); // Exemplo de remoção de token armazenado no localStorage
  window.location.href = "index.html";
  return "Logout realizado com sucesso.";
}

export function renderThoughtsList(thoughts) {
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

export const deleteThought = async (id) => {
  const response = await fetch(`/thought/${id}`, { method: "DELETE" });
  const data = await response.json();
  if (response.ok && data.success) {
    return "Pensamento excluído com sucesso.";
  }
  throw new Error("Erro ao excluir");
};

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
