// controllers/userController.js

const User = require('../models/userModel');
const { validationResult } = require('express-validator');

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll();
      if (users) {
        return res.status(200).json(users);
      } 
  
      // If no user is found, return an empty array for consistency
      return res.status(200).json([]);    } catch (err) {
      next(err);
    }
  },

  getUserById: async (req, res, next) => {
    const { id } = req.params;
  
    try {
      // Find user by their telegram ID
      const user = await User.findOne({ where: { telegramId: id } });
  
      // If user exists, return user data
      if (user) {
        return res.status(200).json(user);
      } 
  
      // If no user is found, return an empty array for consistency
      return res.status(200).json([]);
      
    } catch (err) {
      // Log the error for debugging in production
      console.error('Error fetching user by ID:', err);
  
      // Send a generic server error response to the client
      return res.status(500).json({
        message: 'An internal server error occurred. Please try again later.',
        error: err.message, // Include the error message in non-production environments
      });
  
      // Or you can call the next middleware (e.g., error-handling middleware)
      // next(err);
    }
  },  
  getReferredUsersById: async (req, res, next) => {
    const { telegramId } = req.params;
    try {
      // Find users where referredBy matches the provided telegramId
      const users = await User.findAll({
        where: {
          referredBy: telegramId, // Ensure telegramId is a UUID in the correct format
        },
      });
      console.log(users);

      // Check if any users were found
      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(404).send('No referrals found');
      }
    } catch (err) {
      // Pass error to the next middleware
      next(err);
    }
  },
  addUser: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userData = req.body;
    console.log(userData);

    try {
      // Check if user with the same telegramId already exists
      const existingUser = await User.findOne({ where: { telegramId: userData.telegramId } });
      if (existingUser) {
        return res.status(200).json({ userData: existingUser, message: 'User already exists. Returning existing user.' });
      }

      // Create new user (note the change here)
      const newUser = await User.create({
        telegramId: userData.telegramId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        balance: userData.balance,
        referredBy: userData.referredBy,
        referral_count: userData.referral_count, // ensure referral_count is included if needed
      });

      // Return the created user
      res.status(201).json({ userData: newUser });
    } catch (err) {
      console.error('Error creating user:', err);
      next(err);
    }
  },


  updateUser: async (req, res, next) => {
    const { id } = req.params;
    const userData = req.body;
    try {
      const [updated] = await User.update(userData, {
        where: { id }
      });

      if (updated) {
        res.status(200).send('User updated successfully');
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleted = await User.destroy({
        where: { id }
      });

      if (deleted) {
        res.status(204).send('User deleted successfully');
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      next(err);
    }
  },

  // Backend route to update user balance
  updateUserBalance: async (req, res) => {
    const { telegramId, newBalance } = req.body;

    try {
      // Find the user by their telegramId and update their balance
      const user = await User.findOne({ where: { telegramId } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.balance = newBalance;
      await user.save();

      res.json({ message: 'Balance updated successfully', balance: user.balance });
    } catch (error) {
      res.status(500).json({ message: 'Error updating balance', error });
    }
  },
  getUserCompletedTasks: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await User.findByPk(userId, {
        include: {
          model: Task,
          through: {
            model: CompletedTask,
            attributes: ['completedAt'],
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ completedTasks: user.Tasks });
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
      res.status(500).json({ message: 'Error fetching completed tasks' });
    }
  }


};

module.exports = userController;
