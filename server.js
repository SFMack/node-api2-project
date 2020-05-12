const express = require("express");
const server = express();
const postsRouter = require("./routers/posts-router.js");

server.use(express());
server.use("/api/posts", postsRouter);
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Welcome to the Node API2 Project Server</h2>`);
});

module.exports = server;
