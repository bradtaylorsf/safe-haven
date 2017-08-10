import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Logout from './components/Logout';
import Shelters from './components/Shelters';

export default (
  <Switch>
    <Route exact path = "/" component = {App} />
    <Route path = "/login" component = {Login} />
    <Route path = "/profile" component = {Profile} />
    <Route path = "/register" component = {Register} />
    <Route path = "/logout" component = {Logout} />
    <Route path = "/shelter" component = {Shelters} />
  </Switch>
);
