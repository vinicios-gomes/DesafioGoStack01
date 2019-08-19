const express = require("express");
const server = express();

server.use(express.json());

const projects = [projec];

server.get("/projects", (req, res) => {});

server.get("/projects/:id", (req, res) => {});

server.post("/projects", (req, res) => {});

server.put("/projects/:id", (req, res) => {});

server.delete("/projects/:id", (req, res) => {});

server.post("/projects/:id/tasks", (req, res) => {});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
