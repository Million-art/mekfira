// routes/adminRoutes.js
const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const router = express.Router();
const loginRateLimiter = require('../middlewares/rateLimiter'); // Make sure to import your rate limiter
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
// Route to check auth status
router.get('/auth-status', authStatus, (req, res) => {
    res.send('This is a protected route');
});
// Route to get all admins
router.get('/', adminController.getAllAdmins);

// Route to get an admin by ID
router.get('/:id', adminController.getAdminById);

// Route to delete an admin
router.delete('/:id', adminController.deleteAdmin);

// Route to log in an admin
router.post('/login', loginRateLimiter, loginValidation, adminController.loginAdmin);

// Route to refresh access token
router.post('/refresh-token', adminController.refreshToken);



// Route to add an admin
router.post('/add-admin', addAdminValidation, adminController.addAdmin);

// Route to log out an admin
router.post('/logout', adminController.logoutAdmin);

module.exports = router;