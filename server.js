const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express());
server.use(express.json());

// get all posts
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

// get a specific post
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
});

// add a post
server.post("/api/posts", (req, res) => {
  const newPost = req.body;
  console.log(newPost);
  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err =>
      res.status(400).json({ message: `User was not created\n${err}` })
    );
});

module.exports = server;
