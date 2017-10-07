import React from 'react';
import ReactDOM from 'react-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from './components/App.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
    <BrowserRouter basename="/#">
      <App />
    </BrowserRouter>
    ),
    document.getElementById('app')
  );
});
