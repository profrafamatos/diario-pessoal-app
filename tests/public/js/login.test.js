const { loginUser, setupLoginForm } = require("../../../public/js/login");

global.fetch = jest.fn(); // Mock da função fetch

describe("loginUser", () => {
  test("deve chamar a API de login com os parâmetros corretos", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "testUser" }),
    });

    const response = await loginUser("testUser", "testPassword");

    expect(fetch).toHaveBeenCalledWith("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testUser", password: "testPassword" }),
    });
    expect(response.ok).toBe(true);
  });

  it("deveria tratar o erro da API", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Login falhou" }),
    });

    const response = await loginUser("testUser", "testPassword");

    expect(response.ok).toBe(false);
  });
});

describe("setupLoginForm", () => {
  beforeEach(() => {
    document.body.innerHTML = `
          <form id="loginForm">
            <input id="username" value="testUser" />
            <input id="password" value="testPassword" />
            <button type="submit">Login</button>
          </form>
          <div id="loginError"></div>
        `;

    // Mock de window.location.href
    delete window.location;
    window.location = { href: "" };
  });

  test("deveria redirecionar para a página do diário quando o login for bem-sucedido", async () => {
    // Mock da resposta do fetch para simular sucesso no login
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "testUser" }),
    });

    const form = document.getElementById("loginForm");
    setupLoginForm();

    // Simular o envio do formulário
    form.dispatchEvent(new Event("submit"));

    // Aguardar a execução do código assíncrono com setTimeout
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verificar se o redirecionamento foi feito corretamente
    expect(window.location.href).toBe("/diary?username=testUser");
  });

  test("deveria mostrar uma mensagem de erro quando o login falhar", async () => {
    // Mock da resposta do fetch para simular falha no login
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Login falhou" }),
    });

    // Executa a função de configuração do formulário
    setupLoginForm();

    // Simula a submissão do formulário
    const form = document.getElementById("loginForm");
    form.dispatchEvent(new Event("submit"));

    // Aguarda o código assíncrono ser processado
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verifica se a mensagem de erro foi exibida corretamente
    const loginError = document.getElementById("loginError").textContent;
    expect(loginError).toBe("Login falhou");
  });
});
