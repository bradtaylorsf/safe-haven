const _ = require('lodash');
const Logger = require('../controllers/logger');

function Responder(config) {
  const logger = new Logger(config);
  /**
   * Given an express response object
   * this will check if there is an error, set the correct status code
   * and add the correct view for the error page
   * @param  {Object} res https://expressjs.com/en/api.html#req
   */
  const status = (res) => {
    // set the resonse code if it is supplied, if it is not, then use 500
    if (!_.isUndefined(res.locals.error)) {
      if (!_.isUndefined(res.locals.error.code)
        && _.isNumber(res.locals.error.code)
        && res.locals.error.code > 0) {
        res.status(res.locals.error.code);
      } else {
        res.status(500);
      }
    }
  };

  /**
   * Used the respond the the browser in JSON format
   * @param  {Object} res The express response object: https://expressjs.com/en/api.html#req
   * @return {Response}     Sends the JSON to the browser
   */
  const json = (res) => {
    status(res);
    if (!_.isUndefined(res.locals.error)) {
      res.status(res.locals.error.code);
      logger.log('error', 'responded in json');
      logger.log('error', res.locals);
    }
    res.json(res.locals);
  };

  /**
   * Express Middleware Used by the routes.js files to respond to the browser
   * https://expressjs.com/en/guide/using-middleware.html
   * @param  {Object}   req  https://expressjs.com/en/api.html#req
   * @param  {Object}   res  https://expressjs.com/en/api.html#res
   * @param  {Function} next Will send the request and response to the next middleware
   * @return {response}     Respondes to the browser
   */
  this.respond = (req, res, next) => {
    logger.log('info', `Responding to: ${req.originalUrl}`);
    logger.log('info', `Environment: ${config.server.env}`);
    res.locals.user = res.locals.user || req.user || false;
    json(res);
  };

  /**
   * Express middleware used for handling errors
   * https://expressjs.com/en/guide/using-middleware.html
   *
   * @param  {Object}   err  Error message
   * @param  {Object}   req  https://expressjs.com/en/api.html#req
   * @param  {Object}   res  https://expressjs.com/en/api.html#res
   * @param  {Function} next Will send the request and response to the next middleware
   * @return {response}     Respondes to the browser
   */
  this.error = (err, req, res) => {
    console.log(err);
    if (err) {
      res.locals.error = err;
    } else {
      res.locals.error = {
        code: 500,
        message: 'Unknown error occured',
      };
    }
    json(res);
  };

  /**
   * Last middleware to be called if no response is made to the browser
   * @param  {Object} req https://expressjs.com/en/api.html#req
   * @param  {Object} res https://expressjs.com/en/api.html#res
   * @return {response}     Respondes to the browser
   */
  this.notFound = (req, res) => {
    logger.log('info', +req.locals);
    this.error({
      code: 404,
      message: 'Page not found',
    }, req, res);
  };
};


module.exports = Responder;
