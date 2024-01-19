// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';

function App() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, get the user's ID
        const uid = user.uid;
        console.log('User ID: ', uid);
        setUserType('user');
      } else {
        // No user is signed in.
        const guestId = sessionStorage.getItem('guestId');
        if (guestId) {
          setUserType('guest');
        } else {
          const newGuestId = uuidv4();
          sessionStorage.setItem('guestId', newGuestId);
          setUserType('new guest');
        }
      }
    });
    // Cleanup
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log('userType: ', userType);
  }, [userType]);
  
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/" element={<MainPage userType={userType} />} />
        </Routes>
      </Router>
  );
}

export default App;