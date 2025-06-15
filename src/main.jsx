import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

// Create custom router to handle React Router warnings
const CustomRouter = ({ children }) => {
  return (
    <Router basename="/MACHA" future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
    
      {children}
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CustomRouter>
          <App />
        </CustomRouter>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
