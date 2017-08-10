import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const app = (state = '', action) => {
  switch (action.type) {
    case types.EXAMPLE:
      return action.arg;
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  app,
  routing,
});

export default rootReducer;
