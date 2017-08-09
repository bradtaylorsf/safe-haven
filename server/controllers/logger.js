const winston = require('winston');
const _ = require('lodash');

function Logger(config) {
  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: config.logger.level,
        handleExceptions: true,
        json: false,
        colorize: true,
        prettyPrint: true,
      }),
    ],
    exitOnError: false,
  });

  if (!config.logger.enabled || config.server.env === 'test') {
    logger.remove(winston.transports.Console);
  }

  /**
   * Used for logging all actions. We can build out more complex logging as we go.
   * @param  {String} level Options are ['error', 'warn', 'info', 'verbose', 'debug']
   * @param  {String|Object} msg   Can be a string, or an object to write to the log
   */
  this.log = (level, msg) => {
    if (_.isObject(msg)) {
      _.forEach(msg, (value, key) => {
        if (_.isObject(value)) {
          logger.log(level, value);
        } else {
          logger.log(level, `${key.toUpperCase()}: ${value}`);
        }
      });
    } else {
      logger.log(level, msg);
    }
  };
}
module.exports = Logger;
