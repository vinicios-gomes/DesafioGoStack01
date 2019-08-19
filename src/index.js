const express = require("express");
const server = express();

server.use(express.json());

/*
 * Inicialização da Variavel contadora, servira para contar quantas requisicoes foram feitas.
 */

let cont = 0;

const projects = [
  {
    id: "1",
    title: "Projeto 01",
    tasks: ["Tarefa"]
  },
  {
    id: "2",
    title: "Projeto 02",
    tasks: ["tarefa 1", "tarefa 2"]
  }
];

/**
 * Middleware Contador
 */
function ContadorRequisicoes(req, res, next) {
  cont++;
  console.log(`Requisições feitas até agora ${cont}`);
  next();
}

/**
 * Habilitando ele para ser usado globalmente
 */
server.use(ContadorRequisicoes);

/**
 * Middleware para checagem de projetos
 */

function checkProjectsExist(req, res, next) {
  if (!projects[req.params.id]) {
    return res.send({ message: "Projeto não existe" });
  }
  return next();
}

/**
 * Rotas do Projeto
 */

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const tasks = [];
  const { id, title } = req.body;

  projects.push({ id, title, tasks });

  return res.json(projects);
});

server.put("/projects/:id", checkProjectsExist, (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  projects[id].title = title;
  return res.json(projects);
});

server.delete("/projects/:id", checkProjectsExist, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.json(projects);
});

/**
 * Rota para Tasks
 */

server.post("/projects/:id/tasks", checkProjectsExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.json(projects);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
