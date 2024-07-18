const express = require("express");
const { createPost, getPosts } = require("../controllers/postController");

const router = express.Router();

router.post("/post", createPost);
router.get("/post", getPosts);

module.exports = router;
