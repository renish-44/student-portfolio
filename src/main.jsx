import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Requirement: <BrowserRouter> wraps <App /> exactly once, only here in main.jsx */}
    <BrowserRouter>
      <App name="Alex Carter" themeColor="#4f8cff" />
    </BrowserRouter>
  </React.StrictMode>
);
