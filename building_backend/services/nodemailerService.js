// services/nodemailerService.js
const nodemailer = require('nodemailer');

// Create a transport for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password', // Use app password if 2FA is enabled
  },
});

const sendNotificationEmail = async (tenantEmail, officeName, endDate) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: tenantEmail,
    subject: `Rental Agreement Ending Soon: ${officeName}`,
    text: `Dear Tenant, your rental agreement for ${officeName} is ending on ${endDate}. Please make arrangements for renewal or vacating the premises.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${tenantEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendNotificationEmail;
