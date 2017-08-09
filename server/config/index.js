/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config({ silent: true });
}

const server = require('./components/server');
const logger = require('./components/logger');
const client = require('./components/client');
const mongo = require('./components/mongo');

module.exports = Object.assign({}, server, logger, client, mongo);
