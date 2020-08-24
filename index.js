const express = require("express");

const server = express();

server.use(express.json());

const users = ["Paulo", "Andre"];

//Middleware Global: logs de requisição
server.use((req, res, next) => {
  console.log(`Método: ${req.method}, URL: ${req.url}`);

  return next();
});

//Middleware Local
function checkName(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ message: "Você precisa enviar o name!!!" });
  }

  return next();
}

/* 
CRUD: CREATE-READ-UPDATE-DELETE
*/

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", checkName, (req, res) => {
  const { name } = req.body;

  users.push(name);
  return res.json(users);
});

/* ROUTE PARAMS */
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  users[id] = newName;

  return res.json({ users });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  users.splice(id, 1);

  return res.json(users);
});

server.listen(3000);
