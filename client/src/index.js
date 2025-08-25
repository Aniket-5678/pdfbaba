import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './components/context/auth';
import { ThemeProvider } from './components/context/ThemeContext';
import { HelmetProvider } from "react-helmet-async"; 
import 'antd/dist/reset.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <HelmetProvider>
    <ThemeProvider>
    <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);


