// authController.test.js
const request = require("supertest");
const express = require("express");
const { login } = require("../../../controllers/authController"); // Ajuste o caminho conforme necessário

const app = express();
app.use(express.json()); // Middleware para analisar JSON
app.post("/login", login); // Rota para a função de login

describe("Teste da função de login", () => {
  test("Login bem-sucedido", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "admin", password: "1234" }); // Envia credenciais corretas

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Login bem-sucedido",
      username: "admin",
    });
  });

  test("Login com usuário inválido", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "user", password: "wrongpass" }); // Envia credenciais incorretas

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Usuário ou senha inválidos",
    });
  });

  test("Login com dados ausentes", async () => {
    const response = await request(app).post("/login").send({}); // Envia dados vazios

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Usuário ou senha inválidos",
    });
  });
});
