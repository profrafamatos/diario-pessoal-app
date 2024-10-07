// main.js
const express = require("express");
const path = require("path");
const authRoutes = require("../routes/authRoutes");
const thoughtRoutes = require("../routes/thoughtRoutes");

const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json()); // Para trabalhar com JSON nas requisições

// Rotas
app.use("/", authRoutes);
app.use("/", thoughtRoutes);

// Servir página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views", "index.html"));
});

// Servir página de diário
app.get("/diary", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views", "diary.html"));
});

// Rota para logout 
app.post("/logout", (req, res) => {
  // Aqui você pode adicionar qualquer lógica de logout do servidor
  // Por exemplo, invalidar sessões, etc.
  res.status(200).json({ message: "Logout realizado com sucesso." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
