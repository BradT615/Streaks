// LoginPage.js
import React, { useState } from 'react';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import logo from '../assets/logo.png';
import { CiMail, CiLock } from "react-icons/ci";
import { PiEyeLight , PiEyeSlashLight } from "react-icons/pi";
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(<PiEyeSlashLight className="text-custom-text hover:text-custom-hover" />);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('No error message');
    const [messageClassName, setMessageClassName] = useState('text-red-400');


    const navigate = useNavigate();
    const auth = getAuth();

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

    const handleLogin = (e) => {
        e.preventDefault(); 
    
        const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    
        setPersistence(auth, persistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            })
            .then((userCredential) => {
                // Get the guest ID from session storage
                const guestId = sessionStorage.getItem('guestUUID');
                // If a guest ID exists
                if (guestId) {
                    // Get a reference to the guest document
                    const guestRef = doc(db, 'guests', guestId);
                    // Delete the guest document
                    deleteDoc(guestRef).then(() => {
                        console.log("Guest successfully deleted!");
                        // Remove the guest ID from session storage
                        sessionStorage.removeItem('guestUUID');
                    }).catch((error) => {
                        console.error("Error removing guest: ", error);
                        setErrorMessage(getCustomErrorMessage(error.code));
                        setShowErrorModal(true);
                    });
                }
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    navigate("/");
                }, 0);
            })
            .catch(() => {
                setErrorMessage('Invalid Email or Password.');
                setMessageClassName('text-red-400');
                setShowErrorModal(true);
                handleButtonClick();
            });
    }

    const handleForgotPassword = () => {
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setErrorMessage('Password reset Email sent!');
                    setMessageClassName('text-green-400');
                    setShowErrorModal(true);
                })
                .catch((error) => {
                    setErrorMessage('Error sending Password reset Email.');
                    setMessageClassName('text-red-400');
                    setShowErrorModal(true);
                    handleButtonClick();
                });
        } else {
            setErrorMessage('Please enter your Email address.');
            setMessageClassName('text-red-400');
            setShowErrorModal(true);
            handleButtonClick();
        }
    };

    const handleButtonClick = () => {
        const element = document.querySelector('#error-message');
        if (element) {
            element.classList.remove('animate-shake');
            const offsetWidth = element.offsetWidth;
            console.log(offsetWidth);
            element.classList.add('animate-shake');
        }
    };

    const togglePasswordVisibility = () => {
        if (inputType === 'password') {
            setInputType('text');
            setIcon(<PiEyeLight className="text-custom-text hover:text-custom-hover" />);
        } else {
            setInputType('password');
            setIcon(<PiEyeSlashLight className="text-custom-text hover:text-custom-hover" />);
        }
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <form onSubmit={handleLogin} className="h-screen w-full flex flex-col text-2xl">
            <div className='flex flex-col gap-4 justify-around items-center m-auto py-12 w-full max-w-lg rounded-lg shadow-lg bg-custom-light bg-opacity-85 backdrop-blur-md'>
                <Link to='/' className='no-select'>
                    <img src={logo} alt='Logo' className='w-[130px] mx-auto mb-4'></img>
                    <p className='text-custom-hover text-4xl text-center'>Streaks</p>
                </Link>
                
                <div className='flex flex-col items-center w-full pb-3 font-medium'>
                    <div className='group bg-transparent flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover pb-[1px] w-3/4 min-w-60'>
                        <CiMail className='text-[#9ea0a2] group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-transparent text-[#9ea0a2] p-2 pr-8 text-xl hover:text-custom-hover focus:text-custom-hover outline-none w-full'
                            type='Email'
                            placeholder='Email'
                            autocomplete="username"
                            required
                        />
                    </div>

                    <div className='group bg-transparent flex password-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover mt-6 relative pb-[1px] w-3/4 min-w-60'>
                        <CiLock className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-transparent text-custom-text group-hover:text-custom-hover focus:text-custom-hover p-2 pr-8 text-xl outline-none w-full'
                            type={inputType}
                            placeholder='Password'
                            autocomplete="current-password"
                        />
                        <button onClick={togglePasswordVisibility} type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center text-xl sm:text-2xl leading-5 outline-none group-focus-within:text-custom-hover">
                            {icon}
                        </button>
                    </div>


                    <div className='flex justify-around w-full sm:px-2'>
                        <div className='group/nested flex items-center mt-2 cursor-pointer no-select' onClick={toggleRememberMe}>
                            {rememberMe 
                                ? <FaCheckSquare className="text-custom-text pr-1 group-hover/nested:text-custom-hover h-3 sm:h-4"/> 
                                : <FaRegSquare className="text-custom-text pr-1 group-hover/nested:text-custom-hover h-3 sm:h-4"/>
                            }
                            <p className='text-sm sm:text-lg font-thin text-custom-text group-hover/nested:text-custom-hover'>Remember Me</p>
                        </div>
                        <p className='text-sm sm:text-lg font-thin text-custom-text mt-2 no-select hover:text-custom-hover' onClick={handleForgotPassword}>Forgot Password?</p>
                    </div>
                    <div id="error-message" className={`text-[20px] ${messageClassName} mt-3 ${showErrorModal ? 'visible animate-shake' : 'invisible'}`}>
                        <p>{errorMessage}</p>
                    </div>
                </div>
                <div className='font-thin text-sm sm:text-lg flex flex-col'>
                    <button type="submit" className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover text-2xl font-medium py-2 mx-6 hover:mx-2 rounded-full shadow-lg no-select transition-all duration-200 ease-out">
                        Log In
                    </button>
                    <div className='flex gap-1 w-full justify-center text-custom-text mt-2'>
                        <p>Don't have an account?</p>
                        <Link to='/signup' className='font-medium text-[#c3c5c8] hover:text-custom-hover no-select'>Sign Up</Link>
                    </div>
                    <div className='flex items-center w-full justify-center text-custom-text -mt-2 no-select'>
                        <div className='flex-1 border-t border-custom-text'></div>
                        <p className='px-1 pb-1'>or</p>
                        <div className='flex-1 border-t border-custom-text'></div>
                    </div>
                    <div className='flex justify-center'>
                        <Link to='/' className='text-custom-text hover:text-custom-hover -mt-3'>Continue as Guest</Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginPage;
