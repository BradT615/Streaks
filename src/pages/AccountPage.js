// AccountPage.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { updateProfile, updateEmail, updatePassword, signOut, deleteUser } from "firebase/auth";
import logo from '../assets/logo.png';
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import UserContext from '../contexts/UserContext';

function AccountPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (auth.currentUser) {
            try {
                await updateProfile(auth.currentUser, {
                    displayName: displayName,
                });
                await updateEmail(auth.currentUser, email);
                await updatePassword(auth.currentUser, password);
                console.log("Profile updated successfully!");
                // Optionally, you might want to refresh the displayName in the UI
                setDisplayName(auth.currentUser.displayName);
                setEmail(auth.currentUser.email);
            } catch (error) {
                console.error("Error updating profile: ", error);
            }
        } else {
            console.log("No user is signed in.");
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
        <div className="bg-custom-bg flex flex-col h-screen font-medium text-custom-text">
            <Link to='/'>
                <div className="group flex items-center no-select mx-[2vw] mt-3 md:mt-6">
                    <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className='text-gradient text-2xl sm:text-3xl'>Streaks</h1>
                </div>
            </Link>
            
            <div className='flex flex-col justify-center sm:text-xl w-full max-w-xl h-full m-auto px-4'>
                <h1 className='text-center text-custom-hover font-semibold text-2xl sm:text-4xl mb-12'>My account</h1>

                <div className='flex max-[320px]:flex-col gap-6 mb-8 justify-around w-full items-center'>
                    <div className='h-36 w-36'>
                        {auth.currentUser?.photoURL ? (
                            <img src={auth.currentUser?.photoURL} alt='Profile' className=' mx-auto rounded-full border-2'></img>
                        ) : (
                            <CiUser className='h-full w-full p-10 rounded-full border-[1px] border-custom-text' />
                        )}
                    </div>
                </div>

                <div className='flex flex-col items-center gap-6'>

                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-10/12 min-w-60'>
                        <CiUser className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)} // Corrected here
                            className='bg-custom-bg text-custom-text p-2 pr-8 hover:text-custom-hover focus:text-custom-hover outline-none w-full'
                            type='text'
                            placeholder='New Username'
                        />
                    </div>

                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-10/12 min-w-60'>
                        <CiMail className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-custom-bg text-custom-text p-2 pr-8 hover:text-custom-hover focus:text-custom-hover outline-none w-full'
                            type='Email'
                            placeholder='New Email'
                        />
                    </div>

                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-10/12 min-w-60'>
                        <CiLock className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-custom-bg text-custom-text p-2 pr-8 hover:text-custom-hover focus:text-custom-hover outline-none w-full'
                            type={password}
                            placeholder='Password'
                        />
                    </div>

                    <button type="submit" onClick={handleSubmit} className="border-[1px] border-custom-text hover:border-custom-hover hover:text-custom-hover rounded-lg p-2 px-8 mb-12">
                        Save
                    </button>

                </div>
            </div>
            <div className='flex flex-col gap-4 mt-4 pb-4'>
                <button onClick={signOutUser} className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover w-fit mx-auto text-2xl font-medium py-2 px-8 hover:px-12 rounded-full shadow-lg no-select transition-all duration-200 ease-out">
                    Sign Out
                </button>
                <button onClick={deleteAccount} className='text-red-200 hover:text-red-300 font-thin text-lg sm:text-xl p-1'>Delete Account</button>
            </div>
        </div>
    );
}

export default AccountPage;
