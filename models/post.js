const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  profilePhoto: String,
  post: String,
  photo: String,
  username: String,
  name: String,
  email: String,
  like: Number,
});

module.exports = mongoose.model("Post", postSchema);
