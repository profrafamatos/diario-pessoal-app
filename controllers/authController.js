// controllers/authController.js
const users = [{ username: "admin", password: "1234" }];

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login bem-sucedido", username });
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
};
