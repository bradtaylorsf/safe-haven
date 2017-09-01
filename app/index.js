import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const newConfigureStore = require('./store/configureStore');

const newStore = newConfigureStore.configureStore();
const newHistory = newConfigureStore.history;
const NewRoot = require('./containers/Root').default;


ReactDOM.render(
  <AppContainer>
    <Root store = {store} history = {history} />
  </AppContainer>
  , document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    ReactDOM.render(
      <AppContainer>
        <NewRoot store = {newStore} history = {newHistory} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
