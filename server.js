const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express());
server.use(express.json());

server.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the data",
      });
    });
});

module.exports = server;
