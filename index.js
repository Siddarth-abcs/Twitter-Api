const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to MongoDB
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
}
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const subscribe = require("./routes/subscribe");

app.use("/", postRoutes);
app.use("/", userRoutes);
app.use("/", subscribe);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
