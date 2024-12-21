const nodemailer = require("nodemailer");

// Helper function to send reset password email
exports.sendResetEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    secure: true,
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.SMTP_USER || "millionmulugeta09@gmail.com",
      pass: process.env.SMTP_PASS || "oaffvdlgkxsbfsod",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || "hello@techsphareet.com",
    to: email,
    subject: "Password Reset",
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>If you did not request this, please ignore this email.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send reset email.");
  }
};
