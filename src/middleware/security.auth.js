/* eslint-disable no-underscore-dangle */
// noinspection JSCheckFunctionSignatures,ExceptionCaughtLocallyJS

const jwt = require('jsonwebtoken');
const assert = require('assert');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const log = require('../services/logger.service');

assert(process.env.JWT_SECRET, 'JWT_SECRET must be set');

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.header('Authorization');
    const accessToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const transaction = new Transaction({
      method: `${req.method}`,
      url: `${req.originalUrl}`,
      user_email: decoded.email,
    });
    await transaction.save();
    const user = await User.findOne({ _id: decoded._id, token: accessToken });

    if (!user) {
      throw new Error('Error occurred during authentication, please check your credentials');
    }

    req.accessToken = accessToken;
    req.user = user;
    next();
  } catch (error) {
    log.error(error.message);
    res.status(401).send({ errorMessage: error.message });
  }
};

module.exports = authenticate;
