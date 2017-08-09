const config = require('../config');
const _ = require('lodash');

/**
 * Middleware that is ran before all routes in app.js
 * add functions here you want to run before the routes middleware are ran
 */

/**
 * Used to detemine if we should use stage or production
 * could probably be rewritten to just add environment
 * @param  {Object}  req https://expressjs.com/en/api.html#req
 * @return {Boolean}     Is it production or not
 */

const isPreview = (req) => {
  if (!_.isEmpty(req)) {
    req.isPreview = config.server.env !== 'production';
  }
};

/**
 * Will append a friendly slug to the request object for query in contentful
 * @param  {Object} req https://expressjs.com/en/api.html#req
 */
const slug = (req) => {
  if (!_.isUndefined(req.originalUrl)) {
    req.slug = req.originalUrl.split('?')[0].split('#')[0];
  }
};

/**
 * Adding the configuration items that should be present in the client
 */
const addClientConfig = (res) => {
  res.locals.config = config.client;
  const fullUrl = `${res.req.protocol}://${res.req.get('host')}${res.req.originalUrl}`;
  let canonicalUrl = fullUrl;
  if (canonicalUrl.indexOf('?') > -1) {
    canonicalUrl = canonicalUrl.substring(0, canonicalUrl.indexOf('?'));
  }
  res.locals.config.canonicalUrl = canonicalUrl;
  res.locals.config.url = fullUrl;
};

const init = () => (req, res, next) => {
  slug(req);
  isPreview(req);
  addClientConfig(res);
  next();
};

module.exports = init;
