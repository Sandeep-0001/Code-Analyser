import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CodeAnalyzer from './CodeAnalyzer.jsx';
import { NavbarDemo } from './NavBar.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#020617' }}>
        <NavbarDemo />
        <CodeAnalyzer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
