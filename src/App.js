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
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
        setIsLoggedIn(true);
        const uid = user.uid;
        console.log('User ID: ', uid);
        } else {
        setIsLoggedIn(false);
        // Check guest ID
        const guestId = sessionStorage.getItem('guestId');
        if (guestId) {
            console.log('guest ID: ', guestId);
        } else {
            // Create guest ID
            const newGuestId = uuidv4();
            sessionStorage.setItem('guestId', newGuestId);
            console.log('New guest ID: ', guestId);
        }
        }
    });
    // Cleanup
    return () => unsubscribe();
    }, []);

    return (
    <Router>
        <Routes>
            <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    </Router>
    );
}

export default App;