const express = require("express");

const server = express(); //Chama a função do express

server.use(express.json());

const users = ["Ayrton", "André", "Paulo"];

// //query params: ?nome=Paulo
// server.get("/", (req, res) => {
//   const { nome } = req.query;
//   return res.send(`Olá, ${nome}`);
// });

// //route params: /user/1
// server.get("/aluno/:id", (req, res) => {
//   const { id } = req.params;
//   return res.send(`Buscando o usuário ${user[id - 1]}`);
// });

//GLOBAL MIDDLEWARE
server.use((req, res, next) => {
  console.time("request");
  console.log(`Método ${req.method} na rota ${req.url}`);

  next();

  console.timeEnd("request");
});

//LOCAL MIDDLEWARES
function CheckUserName(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  next();
}

function CheckUserId(req, res, next) {
  const { id } = req.params;
  if (!users[id]) {
    return res.status(400).json({ error: "Users does not exists" });
  }

  next();
}
//READ
server.get("/user", (req, res) => {
  return res.json(users);
});

server.get("/user/:id", CheckUserId, (req, res) => {
  const { id } = req.params;
  return res.json(users[id - 1]);
});

//CREATE
server.post("/user", CheckUserName, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//UPDATE
server.put("/user/:id", CheckUserId, CheckUserName, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  users[id] = name;

  return res.json(users);
});

//DELETE
server.delete("/user/:id", CheckUserId, (req, res) => {
  const { id } = req.params;

  users.splice(id, 1);

  return res.json({ mensagem: "Usuário excluído", users });
});

server.listen(3000);
