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
router.post('/add', addRental); // Add a rental
router.get('/all', getRentals); // Get all rentals
router.get('/:id', getRentalById); // Get rental by ID
router.patch('/:id', updateRental); // Update a rental by renterId
router.delete('/:id', deleteRental); // Delete a rental by renterId

// Route to notify about rentals ending soon
router.get('/notify-endings', notifyRentalsEndingSoon); // Notify for rentals ending soon

module.exports = router;
