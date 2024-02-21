// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import ProtectedWrapper from './components/ProtectedWrapper';
import UserWrapper from './components/UserWrapper';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/account" element={<ProtectedWrapper><AccountPage /></ProtectedWrapper>} />
          <Route path="/login" element={<UserWrapper><LoginPage /></UserWrapper>} />
          <Route path="/signup" element={<UserWrapper><SignupPage /></UserWrapper>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;