const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  location: String,
  bio: String,
  website: String,
  profilePhoto: String,
  backgroundPhoto: String,
  email: { type: String, unique: true },
  dob: String,
});

module.exports = mongoose.model("User", userSchema);
