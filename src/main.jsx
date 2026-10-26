import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n.js';
import App from './App.jsx';
import './styles.css';
import './product.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
