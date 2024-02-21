// AccountPage.js
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, storage } from '../firebaseConfig';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updateProfile, updateEmail, updatePassword, signOut, deleteUser } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { UserContext } from '../contexts/UserContext';
import logo from '../assets/logo.png';
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import { PiEyeLight , PiEyeSlashLight } from "react-icons/pi";
import { FiEdit2, FiCheck } from "react-icons/fi";

function AccountPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [profilePicUrl, setProfilePicUrl] = useState(auth.currentUser?.photoURL);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(<PiEyeSlashLight className="text-custom-text hover:text-custom-hover" />);
    const [authPassword, setAuthPassword] = useState('');
    const [authInputType, setAuthInputType] = useState('password');
    const [authIcon, setAuthIcon] = useState(<PiEyeSlashLight className="text-custom-text hover:text-custom-hover" />);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [messageClassName, setMessageClassName] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setProfilePicUrl(user.photoURL || '');
        }
    }, [user]);

    const fileInputRef = useRef();
    
    const onFileChange = (event) => {
      onFileUpload(event.target.files[0]);
    };
    
    const onFileUpload = async (file) => {
        if (!file) {
            console.log("No file selected!");
            return;
        }
    
        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("Error uploading file:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                
                    updateProfile(auth.currentUser, {
                    photoURL: downloadURL
                    }).then(() => {
                        console.log("Profile picture updated");
                        setProfilePicUrl(downloadURL);
                    }).catch((error) => {
                    console.error("Error updating profile picture:", error);
                    });
                });
            }
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName });
                await updateEmail(auth.currentUser, email);
                await updatePassword(auth.currentUser, password);
                setErrorMessage('Profile updated successfully!');
                setMessageClassName('text-green-400');
                setShowErrorModal(true);
            } else {
                throw new Error('No user is signed in.');
            }
        } catch (error) {
            const simplifiedErrorMessage = error.message.split(': ')[1].split(' (')[0];
            setErrorMessage(simplifiedErrorMessage);
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
    const toggleAuthPasswordVisibility = () => {
        if (authInputType === 'password') {
            setAuthInputType('text');
            setAuthIcon(<PiEyeLight className="text-custom-text hover:text-custom-hover" />);
        } else {
            setAuthInputType('password');
            setAuthIcon(<PiEyeSlashLight className="text-custom-text hover:text-custom-hover" />);
        }
    };

    const signOutUser = async () => {
        await signOut(auth);
        navigate("/");
    };

    const deleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, authPassword);
    
        // Reauthenticate the user
        try {
            await reauthenticateWithCredential(user, credential);
        } catch (error) {
            console.error("Error reauthenticating user", error);
            return;
        }
    
        // Get a reference to the user document
        const userRef = doc(db, 'users', user.uid);
        // Delete the user document
        deleteDoc(userRef).then(() => {
            console.log("User document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing user document: ", error);
        });
    
        // Delete the user
        try {
            await deleteUser(user);
            navigate("/");
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    return (
        <div className="bg-custom-bg flex flex-col h-screen font-medium text-custom-text">
            <Link to='/'>
                <div className="group flex items-center no-select mx-[2vw] mt-4 md:mt-6">
                    <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className='text-gradient text-2xl sm:text-3xl'>Streaks</h1>
                </div>
            </Link>
            {showDeleteModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom rounded-lg text-center text-custom-text overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="flex flex-col items-center bg-custom-bg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg my-3" id="modal-title">
                                    Are you sure you want to delete your account?
                                </h3>
                                <div className='group flex pb-[1px] border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover relative w-10/12 min-w-60'>
                                    <CiLock className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full self-center min-w-6 sm:w-8'/>
                                    <input
                                        value={authPassword}
                                        onChange={(e) => setAuthPassword(e.target.value)}
                                        className='bg-custom-bg text-custom-text p-2 pr-8 sm:text-lg hover:text-custom-hover focus:text-custom-hover outline-none w-full'
                                        type={authInputType}
                                        placeholder='Confirm password'
                                    />
                                    <button onClick={toggleAuthPasswordVisibility} type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center text-xl sm:text-2xl leading-5 outline-none group-focus-within:text-custom-hover">
                                        {authIcon}
                                    </button>
                                </div>
                            </div>
                            <div className="bg-custom-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="w-full inline-flex justify-center rounded-md border-[1px] border-red-200 hover:border-red-300 shadow-sm px-4 py-2 text-red-200 hover:text-red-300  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-300 sm:ml-3 sm:w-auto sm:text-sm" onClick={confirmDeleteAccount}>
                                    Delete
                                </button>
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border-[1px] border-custom-text hover:border-custom-hover hover:text-custom-hover shadow-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-custom-hover sm:mt-0 sm:w-auto sm:text-sm" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex flex-col justify-center sm:text-xl w-full max-w-xl m-auto px-4 pb-12 pt-4 rounded-lg shadow-lg bg-custom-light'>
                <div className='w-fit ml-auto hover:text-custom-hover'>
                    <button type="submit" onClick={handleSubmit} className={`w-fit rounded-lg`}>
                        <FiCheck className='text-5xl'/>
                    </button>
                </div>
                
                <h1 className='text-center text-custom-hover font-semibold text-2xl sm:text-4xl mb-16'>Edit Profile</h1>

                <div className='flex max-[320px]:flex-col gap-6 mb-8 justify-around w-full items-center'>
                    <div className='h-36 w-36 relative group' onClick={() => fileInputRef.current.click()}>
                        {profilePicUrl ? (
                            <img src={profilePicUrl} alt='Profile' className='mx-auto h-36 w-36 object-cover rounded-full border-2 group-hover:opacity-50 transition-opacity'></img>
                        ) : (
                            <CiUser className='h-full w-full p-10 rounded-full border-[1px] border-custom-text group-hover:opacity-50 transition-opacity' />
                        )}
                        <FiEdit2 className='absolute inset-0 m-auto h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none' />
                    </div>
                    <input type="file" ref={fileInputRef} onChange={onFileChange} style={{ display: 'none' }} />
                </div>

                <div className='flex flex-col items-center gap-6'>

                    <div className='group flex border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover pb-[1px] w-10/12 min-w-60'>
                        <CiUser className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className='bg-custom-light text-custom-text p-2 pr-8 hover:text-custom-hover focus:text-custom-hover outline-none w-full'
                            type='text'
                            placeholder='New Username'
                        />
                    </div>

                    <div className='group flex border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover pb-[1px] w-10/12 min-w-60'>
                        <CiMail className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-custom-light text-custom-text p-2 pr-8 hover:text-custom-hover focus:text-custom-hover outline-none w-full'
                            type='Email'
                            placeholder='New Email'
                        />
                    </div>

                    <div className='group flex border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover relative pb-[1px] w-10/12 min-w-60'>
                        <CiLock className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-custom-light text-custom-text p-2 pr-8 hover:text-custom-hover focus:text-custom-hover outline-none w-full'
                            type={inputType}
                            placeholder='New Password'
                        />
                        <button onClick={togglePasswordVisibility} type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center text-xl sm:text-2xl leading-5 outline-none group-focus-within:text-custom-hover">
                            {icon}
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <div id="error-message" className={`absolute text-[20px] text-center ${messageClassName} ${showErrorModal ? 'visible animate-shake' : 'invisible'}`}>
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-4 pb-4'>
                        <button onClick={signOutUser} className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover w-fit mx-auto text-2xl font-medium py-2 px-8 hover:px-12 rounded-full shadow-lg no-select transition-all duration-200 ease-out">
                            Log Out
                        </button>
                        <button onClick={deleteAccount} className='text-red-200 hover:text-red-300 font-thin text-lg sm:text-xl p-1'>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;