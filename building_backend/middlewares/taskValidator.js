const { body, validationResult } = require('express-validator');

const taskValidator = [
  body('companyName')
    .notEmpty()
    .withMessage('Company Name is required.')
    .isString()
    .withMessage('Company Name must be a string.'),
  
  body('totalBudget')
    .notEmpty()
    .withMessage('Total Budget is required.')
    .isNumeric()
    .withMessage('Total Budget must be a number.')
    .isFloat({ min: 0 })
    .withMessage('Total Budget must be a positive number.'),
  
  body('payPerUser')
    .notEmpty()
    .withMessage('Pay Per User is required.')
    .isNumeric()
    .withMessage('Pay Per User must be a number.')
    .isFloat({ min: 0 })
    .withMessage('Pay Per User must be a positive number.'),
  
  body('taskDescription')
    .optional()  // Making it optional as per the model definition
    .isString()
    .withMessage('Task Description must be a string.'),
  
  body('task')
    .notEmpty()
    .withMessage('Task is required.')
    .isString()
    .withMessage('Task must be a string.'),
  
  body('socialMedia')
    .notEmpty()
    .withMessage('Social Media is required.')
    .isIn(['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube', 'Telegram'])
    .withMessage('Invalid social media platform. Choose from Facebook, Twitter, Instagram, LinkedIn, TikTok, YouTube, or Telegram.'),
   
];

module.exports = taskValidator;
