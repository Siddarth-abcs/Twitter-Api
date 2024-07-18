const User = require("../models/user");
const Post = require("../models/post");

exports.updateUser = async (req, res) => {
  const {
    name,
    username,
    location,
    bio,
    website,
    profilePhoto,
    backgroundPhoto,
    email,
    dob,
  } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      {
        name,
        username,
        location,
        bio,
        website,
        profilePhoto,
        backgroundPhoto,
        email,
        dob,
      },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).send("Error updating user");
  }
};

exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { like } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { like },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the post" });
  }
};
