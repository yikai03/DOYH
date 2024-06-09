import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
