// routes/adminRoutes.js
const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const router = express.Router();
const { authStatus } = require('../middlewares/authStatus');

// Validation for login
const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// Validation for adding an admin
const addAdminValidation = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
];
router.get('/auth/check', authStatus,()=>{
    // Admin is authenticated, do something here
    console.log('Admin is authenticated');
});
// Route to get all admins
router.get('/all', adminController.getAllAdmins);

// Route to get an admin by ID
router.get('/:id', adminController.getAdminById);

// Route to delete an admin
router.delete('/:id', adminController.deleteAdmin);

// Route to log in an admin
router.post('/login', loginValidation, adminController.loginAdmin);

// Route to refresh access token
router.post('/refresh-token', adminController.accessTokenGenerator);

// Route to add an admin
router.post('/add-admin', addAdminValidation, adminController.addAdmin);

// Route to log out an admin
router.post('/logout', adminController.logoutAdmin);



module.exports = router;
