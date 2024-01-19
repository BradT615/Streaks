// AccountPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { updateProfile, updateEmail, updatePassword, signOut, deleteUser } from "firebase/auth";


function AccountPage() {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const changeDisplayName = async () => {
    if (displayName) {
      await updateProfile(auth.currentUser, { displayName });
    }
  };

  const changeEmail = async () => {
    if (email) {
      await updateEmail(auth.currentUser, email);
    }
  };

  const changePassword = async () => {
    if (password) {
      await updatePassword(auth.currentUser, password);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    navigate("/");
  };

  const deleteAccount = async () => {
    await deleteUser(auth.currentUser);
    navigate("/");
  };

  return (
    <div className='text-custom-text flex flex-col max-w-lg mx-auto gap-4 items-center mt-24 text-2xl'>
      <h1>Account Page</h1>

      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="New Display Name"
      />
      <button onClick={changeDisplayName}>Change Display Name</button>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="New Email"
      />
      <button onClick={changeEmail}>Change Email</button>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />
      <button onClick={changePassword}>Change Password</button>

      <button onClick={signOutUser}>Sign Out</button>
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  );
}

export default AccountPage;