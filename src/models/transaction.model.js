// noinspection JSUnresolvedFunction

const mongoose = require('mongoose');
const validator = require('validator');

const transactionSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  user_email: {
    type: String,
    unique: false,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
