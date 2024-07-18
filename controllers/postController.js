const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = (await Post.find()).reverse();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
