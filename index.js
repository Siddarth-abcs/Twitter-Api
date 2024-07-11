require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const app = express();

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}
connectToMongo();

app.use(cors());
app.use(express.json());

// Post
const postSchema = new mongoose.Schema({
  profilePhoto: String,
  post: String,
  photo: String,
  username: String,
  name: String,
  email: String,
});
const Post = mongoose.model("Post", postSchema);
// user
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

const User = mongoose.model("User", userSchema);

app.patch("/userUpdates/:email", async (req, res) => {
  console.log(req.body);
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
    const finduser = await User.findOne({ email: req.params.email });

    if (finduser) {
      finduser.name = name || finduser.name;
      finduser.username = username || finduser.username;
      finduser.location = location || finduser.location;
      finduser.bio = bio || finduser.bio;
      finduser.website = website || finduser.website;
      finduser.profilePhoto = profilePhoto || finduser.profilePhoto;
      finduser.backgroundPhoto = backgroundPhoto || finduser.backgroundPhoto;
      finduser.email = email || finduser.email;
      finduser.dob = dob || finduser.dob;

      await finduser.save();
      res.json(finduser);
    } else {
      const newUser = new User({
        name,
        username,
        location,
        bio,
        website,
        profilePhoto,
        backgroundPhoto,
        email,
        dob,
      });
      await newUser.save();
      res.json(newUser);
    }
  } catch (error) {
    res.status(500).send("Error updating user");
  }
});

app.post("/post", async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(201).json(savedPost); // Send the saved post as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Send an error response
  }
});
app.get("/post", async (req, res) => {
  const post = (await Post.find()).reverse();
  if (post) {
    res.status(201).json(post); // Send the saved post as the response
  } else {
    res.status(500).json({ message: "Server error" }); // Send an error response
  }
});
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser); // Send the saved post as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Send an error response
  }
});
app.get("/loggedInUser", async (req, res) => {
  try {
    const email = req.query.email;
    const userdata = await User.findOne({ email: email });
    // console.log(JSON.stringify(userdata));
    if (userdata) {
      res.status(200).json(userdata);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
