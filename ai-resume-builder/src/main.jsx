import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';


import CssBaseline from '@mui/material/CssBaseline';

// --- YEH NAYA CODE HAI ---
// Date picker ke liye provider
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// 'dayjs' ko as a helper use karne ke liye
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// --------------------------

import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* App ko LocalizationProvider se wrap karein */}
    <HelmetProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <App />
    </LocalizationProvider>
    </HelmetProvider>
  </React.StrictMode>
);