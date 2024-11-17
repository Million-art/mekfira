// routes/userRoute.js

const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Define routes for user management
userRoutes.post('/auth', authMiddleware, (req, res) => {
    // Access the authenticated user data from res.locals
    const userData = res.locals.user;

    // Send response with authenticated user data
    res.status(200).send({
        status:200,
        message: 'User is authenticated',
        data: userData // Return the authenticated user data
    });
});
userRoutes.get('/all', userController.getAllUsers);
userRoutes.get('/one/:id', userController.getUserById);
userRoutes.get('/referred/:telegramId', userController.getReferredUsersById);
userRoutes.post('/add', userController.addUser);
userRoutes.put('/update/:id', userController.updateUser);
userRoutes.delete('/delete/:id', userController.deleteUser);
userRoutes.patch('/update-balance', userController.updateUserBalance);
userRoutes.patch('/user-completed-tasks', userController.getUserCompletedTasks);

module.exports = userRoutes;
