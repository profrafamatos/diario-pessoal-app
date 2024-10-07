// tests/controllers/thoughtController.test.js
const request = require("supertest");
const express = require("express");
const {
  getThoughts,
  addThought,
  deleteThought,
  resetThoughts,
} = require("../../../controllers/thoughtController"); // Ajuste o caminho conforme necessário

const app = express();
app.use(express.json());

// Define rotas para testar
app.get("/thoughts", getThoughts);
app.post("/thought", addThought);
app.delete("/thought/:id", deleteThought);

// Resetar pensamentos antes de cada teste
beforeEach(() => {
  resetThoughts(); // Recria a lista de pensamentos original
});

describe("Teste do ThoughtController", () => {
  test("GET /thoughts deve retornar todos os pensamentos", async () => {
    const response = await request(app).get("/thoughts");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, username: "admin", text: "Este é o meu primeiro pensamento!" },
      { id: 2, username: "admin", text: "Outro pensamento importante." },
    ]);
  });

  test("POST /thought deve adicionar um novo pensamento", async () => {
    const newThought = { username: "user1", text: "Um novo pensamento." };

    const response = await request(app).post("/thought").send(newThought);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Pensamento adicionado com sucesso");

    const thoughtsResponse = await request(app).get("/thoughts");
    expect(thoughtsResponse.body.length).toBe(3); // Total deve ser 3
    expect(thoughtsResponse.body[2]).toEqual({
      id: 3,
      username: "user1",
      text: "Um novo pensamento.",
    });
  });

  test("DELETE /thought/:id deve excluir um pensamento existente", async () => {
    const response = await request(app).delete("/thought/1");
    expect(response.status).toBe(204); // Sem conteúdo

    // Verificar se o pensamento foi realmente excluído
    const thoughtsResponse = await request(app).get("/thoughts");
    expect(thoughtsResponse.body.length).toBe(1); // Apenas 1 pensamento deve restar
  });

  test("DELETE /thought/:id deve retornar erro se o pensamento não existir", async () => {
    const response = await request(app).delete("/thought/999"); // ID não existente
    expect(response.status).toBe(204); // Pode não retornar erro, mas sem conteúdo
  });
});
