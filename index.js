const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

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
app.use(express.urlencoded({ extended: true }));

// Routes
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");

app.use("/", postRoutes);
app.use("/", userRoutes);
app.use("/", subscribeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Razorpay
app.post("/razorpay", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    if (!req.body) {
      return res.status(400).json({ error: "Bad Request" });
    }
    const options = req.body;

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: "Bad Request" });
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
