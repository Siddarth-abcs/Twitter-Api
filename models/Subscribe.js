const mongoose = require("mongoose");

const SubscribeSchema = new mongoose.Schema({
  name: String,
  email: String,
  subscribe: String,
});

module.exports = mongoose.model("Subscribe", SubscribeSchema);
