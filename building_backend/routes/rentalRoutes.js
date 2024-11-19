// routes/rentalRoutes.js
const express = require('express');
const {
  addRental,
  getRentals,
  getRentalById,
  updateRental,
  deleteRental,
  notifyRentalsEndingSoon,
} = require('../controllers/rentalControll');

const router = express.Router();

// Routes for rental operations
router.post('/add', addRental);
router.get('/', getRentals);
router.get('/:id', getRentalById);
router.patch('/:id', updateRental);
router.delete('/:id', deleteRental);

// Route to notify about rentals ending soon
router.get('/notify-endings', notifyRentalsEndingSoon);

module.exports = router;
