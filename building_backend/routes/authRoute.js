const express = require("express");
const { forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();

// Define the forgot password route
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
