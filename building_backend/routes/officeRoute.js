const express = require('express');
const officeRoutes = express.Router();
const OfficeController = require('../controllers/officeController');  // Import the updated Office controller
const { authStatus } = require('../middlewares/authStatus');

// Define routes for office management

// Get all available offices (offices that are not rented or under maintenance)
officeRoutes.get('/all', OfficeController.getAllOffices);

// Get office details by ID
officeRoutes.get('/one/:id', OfficeController.getOfficeById);

// Add a new office
officeRoutes.post('/add',authStatus,  OfficeController.addOffice);

// Edit office details by ID
officeRoutes.put('/edit/:id', OfficeController.updateOffice);

// Delete office by ID
officeRoutes.delete('/delete/:id', OfficeController.deleteOffice);

// Rent an office (mark it as 'Rented')
officeRoutes.post('/rent/:officeId', OfficeController.rentOffice);

// Get all rented offices
officeRoutes.get('/rented', OfficeController.getAllRentedOffices);

// Get all offices that are not rented (available or under maintenance)
officeRoutes.get('/not-rented', OfficeController.getNotRentedOffices);

module.exports = officeRoutes;
