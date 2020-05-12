const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express());
server.use(express.json());

// POSTS
//
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

// delete a post
server.delete("/api/posts/:id", (req, res) => {
  const postToDelete = req.params.id;
  console.log(postToDelete);
  db.remove(postToDelete)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err =>
      res.status(404).json({ message: `User was not deleted\n${err}` })
    );
});

// update a post
server.put("/api/posts/:id", (req, res) => {});

// COMMENTS
//
// get all comments
server.get("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findPostComments(id)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    });
});

// add a comment to a specific post
server.post("/api/posts/:id/comments", (req, res) => {
  const newComment = req.body;
  db.insertComment(newComment)
    .then(comment => res.status(201).json(comment))
    .catch(err =>
      res.status(400).json({ message: `Comment was not added.\n${err}` })
    );
});

module.exports = server;
