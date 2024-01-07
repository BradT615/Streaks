import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/CreateAccount" element={<CreateAccountPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
