import React from 'react';
import { main } from '../styles/main.scss';
import Routes from '../routes';
import Navbar from './Navbar';

const App = () =>
(
  <div>
    <h1>Safe Haven</h1>
    <Navbar />
    <footer className = {main} />
    { Routes }
  </div>
);


export default App;
