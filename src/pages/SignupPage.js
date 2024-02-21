// SignupPage.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { CiMail, CiLock } from "react-icons/ci";
import { PiEyeLight , PiEyeSlashLight } from "react-icons/pi";

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(<PiEyeLight className="text-custom-text hover:text-custom-hover" />);

    const navigate = useNavigate();

    const getCustomErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Invalid Email';
            case 'auth/user-disabled':
                return 'User Disabled';
            case 'auth/user-not-found':
                return 'User Not Found';
            case 'auth/wrong-password':
                return 'Wrong Password';
            case 'auth/email-already-in-use':
                return 'Email Already in Use';
            case 'auth/operation-not-allowed':
                return 'Operation Not Allowed';
            case 'auth/weak-password':
                return 'Weak Password';
            default:
                return 'An error occurred';
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
    
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const guestId = sessionStorage.getItem('guestUUID');
    
                const guestRef = doc(db, 'guests', guestId);
                getDoc(guestRef).then((docSnapshot) => {
                    if (docSnapshot.exists()) {                  
                        // Create the user document
                        const userRef = doc(db, 'users', user.uid);
                        setDoc(userRef, {})
                            .then(() => {
                                deleteDoc(guestRef).then(() => {
                                    console.log("Guest successfully deleted!");
                                    sessionStorage.removeItem('guestUUID');
                                    signOut(auth).then(() => {
                                        navigate('/login');
                                    }).catch((error) => {
                                        console.error("Error signing out: ", error);
                                        setErrorMessage(getCustomErrorMessage(error.code));
                                        setShowErrorModal(true);
                                    });
                                }).catch((error) => {
                                    console.error("Error removing guest: ", error);
                                    setErrorMessage(getCustomErrorMessage(error.code));
                                    setShowErrorModal(true);
                                });
                            }).catch((error) => {
                                console.error("Error creating user document: ", error);
                                setErrorMessage(getCustomErrorMessage(error.code));
                                setShowErrorModal(true);
                            });
                    } else {
                        console.log("No such document!");
                        setErrorMessage("No such document!");
                        setShowErrorModal(true);
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                    setErrorMessage(getCustomErrorMessage(error.code));
                    setShowErrorModal(true);
                });
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(getCustomErrorMessage(error.code));
                setShowErrorModal(true);
            });
    };

    const togglePasswordVisibility = () => {
        if (inputType === 'password') {
            setInputType('text');
            setIcon(<PiEyeSlashLight className="text-custom-text hover:text-custom-hover" />);
        } else {
            setInputType('password');
            setIcon(<PiEyeLight className="text-custom-text hover:text-custom-hover" />);
        }
    };

    return (
        <div className="h-screen w-full bg-custom-bg flex flex-col text-2xl">
            <div className='flex flex-col gap-4 justify-around items-center m-auto py-16 w-full max-w-lg rounded-lg shadow-lg bg-custom-light'>
                <Link to='/' className='no-select mb-10'>
                    <img src={logo} alt='Logo' className='w-[130px] mx-auto mb-4'></img>
                    <p className='text-custom-hover text-4xl text-center'>Streaks</p>
                </Link>
                
                <form onSubmit={handleSignup} className='flex flex-col items-center w-full font-medium'>
                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-3/4 pb-[1px] min-w-60'>
                        <CiMail className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input className='bg-custom-light text-custom-text p-2 pr-8 text-xl hover:text-custom-hover focus:text-custom-hover outline-none w-full' type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
    
                    <div className='group flex password-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover mt-6 relative pb-[1px] w-3/4 min-w-60'>
                        <CiLock className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input className='bg-custom-light text-custom-text group-hover:text-custom-hover focus:text-custom-hover p-2 pr-8 text-xl outline-none w-full' type={inputType} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                        <button onClick={togglePasswordVisibility} type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center text-lg sm:text-xl leading-5 outline-none group-focus-within:text-custom-hover">
                            {icon}
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <div id="error-message" className={`absolute text-[20px] text-red-400 text-center ${showErrorModal ? 'visible animate-shake' : 'invisible'}`}>
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                    <div className='font-thin text-sm sm:text-lg flex flex-col mt-12'>
                        <button type="submit" className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover text-2xl font-medium py-2 px-8 hover:px-12 rounded-full shadow-lg no-select transition-all duration-200 ease-out">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
