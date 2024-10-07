import {
  getUsernameFromURL,
  displayUsername,
} from "../../../public/js/utils.js";

describe("Teste das funções do módulo utils.js", () => {
  beforeEach(() => {
    // Limpar o DOM antes de cada teste
    document.body.innerHTML = `
          <div id="usernameDisplay"></div>
        `;
  });

  test("getUsernameFromURL deve retornar o nome de usuário da URL", () => {
    // Simula a URL com um parâmetro de consulta
    window.history.pushState({}, "", "/?username=user1");

    const username = getUsernameFromURL();

    expect(username).toBe("user1");
  });

  test("getUsernameFromURL deve retornar null se não houver parâmetro username", () => {
    // Simula uma URL sem o parâmetro de consulta
    window.history.pushState({}, "", "/?otherParam=value");

    const username = getUsernameFromURL();

    expect(username).toBeNull();
  });

  test("displayUsername deve exibir o nome de usuário corretamente", () => {
    const username = "user1";
    
    // Chama a função para exibir o nome de usuário
    displayUsername(username);
    
    // Verifica se o conteúdo do elemento foi atualizado
    expect(document.getElementById("usernameDisplay").textContent).toBe(`Bem-vindo, ${username}`);
  });
});
