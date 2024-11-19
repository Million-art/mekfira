// services/cronJob.js
const cron = require('node-cron');
const { notifyRentalsEndingSoon } = require('../controllers/rentalControll');

// Schedule the task to run once every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Checking rentals ending soon...');
  await notifyRentalsEndingSoon();
});
