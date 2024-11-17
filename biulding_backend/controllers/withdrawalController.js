// controllers/withdrawalController.js

const Withdrawal  = require('../models/withdrawalModel');
const { validationResult } = require('express-validator');

const withdrawalController = {
  getAllWithdrawals: async (req, res, next) => {
    try {
      const withdrawals = await Withdrawal.findAll();
      res.json(withdrawals);
    } catch (err) {
      next(err);
    }
  },

  getWithdrawalById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const withdrawal = await Withdrawal.findByPk(id);
      if (withdrawal) {
        res.json(withdrawal);
      } else {
        res.status(404).send('Withdrawal not found');
      }
    } catch (err) {
      next(err);
    }
  },

  addWithdrawal: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const withdrawalData = req.body;
    try {
      const newWithdrawal = await Withdrawal.create(withdrawalData);
      res.status(201).json({ withdrawalId: newWithdrawal.id });
    } catch (err) {
      next(err);
    }
  },

  updateWithdrawal: async (req, res, next) => {
    const { id } = req.params;
    const withdrawalData = req.body;
    try {
      const [updated] = await Withdrawal.update(withdrawalData, {
        where: { id }
      });

      if (updated) {
        res.status(200).send('Withdrawal updated successfully');
      } else {
        res.status(404).send('Withdrawal not found');
      }
    } catch (err) {
      next(err);
    }
  },

  deleteWithdrawal: async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleted = await Withdrawal.destroy({
        where: { id }
      });

      if (deleted) {
        res.status(204).send('Withdrawal deleted successfully');
      } else {
        res.status(404).send('Withdrawal not found');
      }
    } catch (err) {
      next(err);
    }
  },

  completeWithdrawal: async (req, res, next) => {
    const { id } = req.params;
    try {
      const [updated] = await Withdrawal.update({ status: 'completed' }, {
        where: { id }
      });

      if (updated) {
        res.status(200).send('Withdrawal completed successfully');
      } else {
        res.status(404).send('Withdrawal not found');
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = withdrawalController;
