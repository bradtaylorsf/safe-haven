import React from 'react';
import { connect } from 'react-redux';
import { main } from '../styles/main.scss';
import Navbar from './Navbar';

const App = props =>
(
  <div>
    <h1>Safe Haven</h1>
    <Navbar />
    <footer className = {main} />
    { props.children }
  </div>
);


// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
