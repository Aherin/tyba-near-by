// noinspection JSCheckFunctionSignatures

const express = require('express');

const app = express();

const registerRoute = require('./register.route');
const loginRoute = require('./login.route');
const logoutRoute = require('./logout.route');
const placeRoute = require('./place.route');
const transactionRoute = require('./transaction.route');

app.use('/v1/api/tyba-ms/user/register', registerRoute);
app.use('/v1/api/tyba-ms/user/login', loginRoute);
app.use('/v1/api/tyba-ms/user/logout', logoutRoute);
app.use('/v1/api/tyba-ms/places', placeRoute);
app.use('/v1/api/tyba-ms/transaction-history', transactionRoute);

module.exports = app;
