const express = require("express");
const {
  createPost,
  getPosts,
  getPostsCount,
} = require("../controllers/postController");

const router = express.Router();

router.post("/post", createPost);
router.get("/post", getPosts);
router.get("/userposts", getPostsCount);

module.exports = router;
