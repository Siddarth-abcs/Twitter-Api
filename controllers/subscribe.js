const Subscribe = require("../models/Subscribe");

exports.createSubscribe = async (req, res) => {
  try {
    const post = new Subscribe(req.body);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSubscribe = async (req, res) => {
  const { email } = req.query;
  try {
    const posts = await Subscribe.find({ email: email });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
