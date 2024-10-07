// controllers/thoughtController.js
let thoughts = [
  { id: 1, username: "admin", text: "Este é o meu primeiro pensamento!" },
  { id: 2, username: "admin", text: "Outro pensamento importante." },
];

//Obter pensamentos já cadastrados
exports.getThoughts = (req, res) => {
  res.status(200).json(thoughts);
};

//Adicionar novo pensamento
exports.addThought = (req, res) => {
  const { username, text } = req.body;
  if (username && text) {
    const newThought = { id: thoughts.length + 1, username, text };
    thoughts.push(newThought);
    res.status(201).json({ message: "Pensamento adicionado com sucesso" });
  } else {
    res.status(400).json({ message: "Dados inválidos" });
  }
};

//Excluir um pensamento cadastrado
exports.deleteThought = (req, res) => {
  const { id } = req.params;
  thoughts = thoughts.filter((thought) => thought.id !== parseInt(id));
  res.status(204).send();
};
