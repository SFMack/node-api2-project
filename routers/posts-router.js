// router object for all api/posts calls/handlers/middlewares/endpoints
const express = require("express");
const db = require("../data/db.js");

const router = express.Router();

// POSTS
//
// get all posts
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
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
// router.post("/", (req, res) => {
//   const newPost = req.body;
//   console.log(newPost);
//   db.insert(newPost)
//     .then(post => {
//       res.status(201).json(post);
//     })
//     .catch(err =>
//       res.status(400).json({ message: `User was not created\n${err}` })
//     );
// });
router.post("/", (req, res) => {
  console.log(req.body);
});

// delete a post
router.delete("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
  const postToUpdate = req.params.id;
  console.log(postToUpdate);
  const updatedPost = req.body;
  console.log(updatedPost);
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    db.update(postToUpdate, updatedPost)
      .then(newPost => {
        res.status(200).json({ message: `Your new user was created` });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: `Post could not be modified \n${err}` });
      });
  }
});

// POST COMMENTS
//
// get all comments
router.get("/:id/comments", (req, res) => {
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
router.post("/:id/comments", (req, res) => {
  const newComment = req.body;
  db.insertComment(newComment)
    .then(comment => res.status(201).json(comment))
    .catch(err =>
      res.status(400).json({ message: `Comment was not added.\n${err}` })
    );
});

module.exports = router;
