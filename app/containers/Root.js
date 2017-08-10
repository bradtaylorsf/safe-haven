const prodRoot = require('./Root.prod');
const devRoot = require('./Root.dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = prodRoot;
} else {
  module.exports = devRoot;
}
