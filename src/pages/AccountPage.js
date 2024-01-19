// AccountPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut, deleteUser } from "firebase/auth";
import Header from '../components/Header';


function AccountPage() {
  const navigate = useNavigate();

  const signOutUser = async () => {
    await signOut(auth);
    navigate("/");
  };

  const deleteAccount = async () => {
    await deleteUser(auth.currentUser);
    navigate("/");
  };

  return (
    <div className='flex flex-col h-screen w-screen text-custom-text text-2xl bg-custom-bg'>
      <Header />
      <h1 className='text-center'>Account Page</h1>
      <div className='flex flex-col max-w-lg mx-auto gap-4 items-center mt-24'>
        <button onClick={signOutUser}>Sign Out</button>
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

export default AccountPage;