const express = require("express");
const server = express();

server.use(express.json());

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

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const tasks = [];
  const { id, title } = req.body;

  projects.push({ id, title, tasks });

  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  projects[id].title = title;
  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.json(projects);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
