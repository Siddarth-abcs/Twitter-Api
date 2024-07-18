const express = require("express");
const {
  updateUser,
  registerUser,
  getUserByEmail,
  updatePost,
} = require("../controllers/userController");
const { otpverify } = require("../controllers/nodemailer");

const router = express.Router();

router.patch("/userUpdates/:email", updateUser);
router.patch("/like/:id", updatePost);
router.post("/register", registerUser);
router.get("/loggedInUser", getUserByEmail);
router.post("/otpverify/:email", otpverify);

module.exports = router;
