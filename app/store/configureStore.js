const prodStore = require('./configureStore.prod');
const devStore = require('./configureStore.dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = prodStore;
} else {
  module.exports = devStore;
}
