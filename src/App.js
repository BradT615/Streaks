import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import MainPage from './pages/MainPage';

function App() {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
