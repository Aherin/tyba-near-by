// noinspection JSUnresolvedVariable

const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

const clearUserTable = async () => {
  await User.deleteMany();
};

const clearTransactionTable = async () => {
  await Transaction.deleteMany();
};

module.exports = { clearUserTable, clearTransactionTable };
