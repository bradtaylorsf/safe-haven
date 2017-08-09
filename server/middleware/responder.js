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
      res.locals.layout = 'wrapper';
      res.locals.view = '404';
      res.locals.bodyClass = 'pg404 gradient';
    }
  };

  /**
   * Used the respond the the browser in JSON format
   * @param  {Object} res The express response object: https://expressjs.com/en/api.html#req
   * @return {Response}     Sends the JSON to the browser
   */
  const json = (res) => {
    if (!_.isUndefined(res.locals.error)) {
      res.status(res.locals.error.code);
      logger.log('error', 'responded in json');
      logger.log('error', res.locals);
    }
    res.json(res.locals);
  };

  /**
   * Used to respond to the browser in HTML format
   * @param  {Object} res https://expressjs.com/en/api.html#req
   * @return {response}     Sends the compiles handlebars template to the browser
   */
  const html = (res) => {
    status(res);
    logger.log('info', `TEMPLATE: ${res.locals.view}`);
    res.render(res.locals.view, res.locals);
  };

  /**
   * Used to determine if the response should be in JSON
   * @param  {Object}  req https://expressjs.com/en/api.html#req
   * @return {Boolean}     Will return true if the route starts with /api or if query debug=true
   */
  const isJson = (req) => {
    /* Check if the path starts with /api
    * Will also return JSON if the user adds ?debug=true
    * in the development environment
    */
    if (_.startsWith(req.originalUrl, '/api/') ||
        (config.server.env !== 'production' && req.query.debug)) {
      return true;
    }
    return false;
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
    if (isJson(req)) {
      json(res);
    } else if (!_.isEmpty(res.locals.view)) {
      html(res);
    } else {
      next();
    }
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

    logger.log('error', err);
    if (isJson(req)) {
      json(res);
    } else {
      html(res);
    }
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
