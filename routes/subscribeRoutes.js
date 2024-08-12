const express = require("express");
const { createSubscribe, getSubscribe } = require("../controllers/subscribe");

const router = express.Router();

router.post("/subscribe", createSubscribe);
router.get("/subscribe", getSubscribe);

module.exports = router;
