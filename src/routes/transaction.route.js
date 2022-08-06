const express = require('express');
const log = require('../services/logger.service');
const authenticate = require('../middleware/security.auth');
const Transaction = require('../models/transaction.model');

const router = new express.Router();

router.get('/', authenticate, async (req, res) => {
  const userEmail = req.user.email;
  try {
    const transaction = await Transaction.find({ user_email: userEmail });
    log.info('/transaction-history successfully retrieved');
    res.status(200).send(transaction);
  } catch (error) {
    log.error(error.message);
    res.status(400).send({ errorMessage: error.message });
  }
});

module.exports = router;
