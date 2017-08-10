import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import Profile from './components/Profile';

export default (
  <Switch>
    <Route exact path = "/" component = {App} />
    <Route path = "/login" component = {Login} />
    <Route path = "/profile" component = {Profile} />
    <Route path = "/register" component = {Profile} />
    <Route path = "/logout" component = {Profile} />
    <Route path = "/shelter" component = {Profile} />
  </Switch>
);
