const express = require('express');
const config = require('config');
const cors = require('cors');
const log = require('./src/services/logger.service');
require('./src/database/mongoose.database');

const app = express();
const port = config.get('server.port');
const host = config.get('server.host');
const router = require('./src/routes/router');

app.use(cors()).use(express.json()).use(router);
app.listen(port, () => {
  log.info(`Tyba API listening at https://${host}:${port}`);
});

module.exports = app;
