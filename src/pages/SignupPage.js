// SignupPage.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { CiUser, CiMail, CiLock } from "react-icons/ci";
import { PiEyeLight , PiEyeSlashLight } from "react-icons/pi";
import { GoArrowLeft } from "react-icons/go";

function SignupPage() {
    const [name, setName] = useState('');
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
    
                // Set the user's display name
                updateProfile(user, { displayName: name })
                    .then(() => {
                        console.log("User's display name updated successfully");
                    })
                    .catch((error) => {
                        console.error("Error updating user's display name: ", error);
                        setErrorMessage(getCustomErrorMessage(error.code));
                        setShowErrorModal(true);
                    });
    
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
                                        navigate('/');
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

    const handleBack = () => {
        navigate("/login");
    }

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
        <div className="card flex flex-col max-w-lg w-full m-4 text-2xl text-custom-text rounded-lg bg-custom-light bg-opacity-85 backdrop-blur-sm">
            <div className='flex flex-col gap-4 justify-around items-center m-auto pb-16 w-full'>
                <div className='flex justify-start w-full pl-4 pt-4 text-4xl'>
                    <button type="submit" onClick={handleBack} className={`w-fit rounded-lg`}>
                        <GoArrowLeft className='hover:text-custom-hover'/>
                    </button>
                </div>
                <Link to='/' className='no-select sm:mb-6'>
                    <img src={logo} alt='Logo' className='w-16 sm:w-[130px] mx-auto mb-2'></img>
                    <p className='text-custom-hover text-2xl sm:text-4xl text-center'>Streaks</p>
                </Link>
                
                <form onSubmit={handleSignup} className='flex flex-col items-center w-full'>
                    <div className='group bg-transparent flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-4/5 sm:w-3/4 pb-[1px] items-center'>
                        <CiUser className='group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input className='bg-transparentappearance-none p-2 pr-8 text-xl hover:text-custom-hover focus:text-custom-hover outline-none w-full' type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
                    </div>
                    <div className='group bg-transparent flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover mt-2 sm:mt-6 w-4/5 sm:w-3/4 pb-[1px] items-center'>
                        <CiMail className='group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input className='bg-transparentappearance-none p-2 pr-8 text-xl hover:text-custom-hover focus:text-custom-hover outline-none w-full' type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                    </div>
    
                    <div className='group bg-transparent flex password-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover mt-2 sm:mt-6 relative w-4/5 sm:w-3/4 pb-[1px] items-center'>
                        <CiLock className='group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input className='bg-transparent group-hover:text-custom-hover focus:text-custom-hover p-2 pr-8 text-xl outline-none w-full' type={inputType} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
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
                        <button type="submit" className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover text-xl sm:text-2xl font-medium py-1 sm:py-2 px-4 sm:px-8 hover:px-12 rounded-full shadow-lg no-select transition-all duration-200 ease-out">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
