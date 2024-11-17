const express = require('express');
const withdrawlaRoutes = express.Router();

const withdrawalController = require('../controllers/withdrawalController');

// Define routes for RouterIpAddress
router.get('/user:telegramId', withdrawalController.withdrawBalace())


module.exports = withdrawlaRoutes;

