// thought.test.js
import {
  postThought,
  loadThoughts,
  logout,
  renderThoughtsList,
  deleteThought
} from "../../../public/js/thought.js";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("Teste de funções do módulo thoughts.js", () => {
  test("postThought deve enviar um pensamento com sucesso", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    const response = await postThought("user1", "Este é um pensamento.");

    expect(fetch).toHaveBeenCalledWith("/thought", expect.any(Object));
    expect(response).toBe("Pensamento adicionado com sucesso.");
  });

  test("postThought deve retornar um erro se o texto estiver vazio", async () => {
    const response = await postThought("user1", "");

    expect(fetch).not.toHaveBeenCalled();
    expect(response).toBeUndefined();
  });

  test("postThought deve retornar um erro se a resposta do servidor não for ok", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: false }), {
      status: 400,
    });

    const response = await postThought("user1", "Este é um pensamento.");

    expect(fetch).toHaveBeenCalledWith("/thought", expect.any(Object));
    expect(response).toBe("Erro ao adicionar o pensamento.");
  });

  test("loadThoughts deve carregar pensamentos com sucesso", async () => {
    const mockThoughts = [{ id: 1, text: "Pensamento 1", username: "user1" }];

    // Mock da resposta do fetch
    fetch.mockResponseOnce(JSON.stringify(mockThoughts));
    const thoughts = await loadThoughts(); // Chama a função

    expect(fetch).toHaveBeenCalledWith("/thoughts"); // Verifica se fetch foi chamado corretamente
    expect(thoughts).toEqual(mockThoughts); // Verifica se o retorno é o esperado
  });

  test("loadThoughts deve retornar null se a resposta do servidor não for ok", async () => {
    fetchMock.mockResponseOnce("", { status: 404 });

    const thoughts = await loadThoughts();

    expect(fetch).toHaveBeenCalledWith("/thoughts");
    expect(thoughts).toBeNull();
  });

  test("loadThoughts deve retornar null se ocorrer um erro", async () => {
    fetchMock.mockRejectOnce(new Error("Falha na conexão"));

    const thoughts = await loadThoughts();

    expect(thoughts).toBeNull();
  });

  test("logout deve remover o token e redirecionar", () => {
    // Mock do localStorage
    localStorage.setItem("authToken", "token");

    // Mock do redirecionamento
    delete window.location; // Deleta a propriedade original
    window.location = { href: "" }; // Cria um novo objeto para simular

    const response = logout();

    expect(localStorage.getItem("authToken")).toBeNull();
    expect(window.location.href).toBe("index.html"); // Verifica se o redirecionamento foi para index.html
    expect(response).toBe("Logout realizado com sucesso.");
  });

  test("renderThoughtsList deve renderizar uma lista de pensamentos", () => {
    document.body.innerHTML = '<div id="thoughtsList"></div>'; // Mock do DOM
    const thoughts = [{ id: "1", username: "user1", text: "Pensamento 1" }];

    renderThoughtsList(thoughts);

    const thoughtsList = document.getElementById("thoughtsList");
    expect(thoughtsList.children.length).toBe(1);
    expect(thoughtsList.children[0].innerHTML).toContain("Pensamento 1");
  });

  test("deleteThought deve excluir um pensamento com sucesso", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    const response = await deleteThought("1");

    expect(fetch).toHaveBeenCalledWith("/thought/1", { method: "DELETE" });
    expect(response).toBe("Pensamento excluído com sucesso.");
  });

  test("deleteThought deve retornar um erro se o pensamento não existir", async () => {
    fetchMock.mockRejectOnce(new Error("Erro ao excluir"));

    await expect(deleteThought("2")).rejects.toThrow("Erro ao excluir");
  });

  test("deleteThought deve retornar um erro se a resposta do servidor não for ok", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: false }), {
      status: 400,
    });

    await expect(deleteThought("1")).rejects.toThrow("Erro ao excluir");
  });
});
