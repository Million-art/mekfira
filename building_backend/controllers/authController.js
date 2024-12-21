const bcrypt = require('bcrypt');
const crypto = require("crypto");
const Admin = require("../models/adminModel");
const { sendResetEmail } = require("../services/emailUtils");  

// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if the user exists
    const user = await Admin.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set token expiry time (1 hour from now)
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour in milliseconds

    // Save the reset token and expiry in the database
    await user.update({
      resetToken: resetToken,
      resetTokenExpiry: resetTokenExpiry,
    });

    const protocol = process.env.PROTOCOL ||  "http"; 
    const host = process.env.HOST || "localhost:5173";  

    // Generate the reset password link
    const resetLink = `${protocol}://${host}/reset-password?token=${resetToken}`;

    // Send reset password email
    await sendResetEmail(user.email, resetLink);

    res.status(200).json({
      message: "Password reset email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

 
// Reset Password Controller
exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword, token } = req.body;

  // Validate the new password and confirm password
  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'Password and confirm password are required.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  try {
    // Find the user with the reset token
    const user = await Admin.findOne({ where: { resetToken: token } });

    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired reset token.' });
    }

    // Check if the reset token has expired
    if (user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: 'Reset token has expired.' });
    }

    // Hash the new password before saving to the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = null; // Clear the reset token after use
    user.resetTokenExpiry = null; // Clear the expiry
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to reset password. Please try again later.' });
  }
};
