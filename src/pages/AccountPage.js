// AccountPage.js
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, storage } from '../firebaseConfig';
import { updateProfile, updateEmail, updatePassword, signOut, deleteUser } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import UserContext from '../contexts/UserContext';
import logo from '../assets/logo.png';
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";

function AccountPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [profilePicUrl, setProfilePicUrl] = useState(auth.currentUser?.photoURL);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
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
                    setProfilePicUrl(downloadURL); // Update the profile picture URL in the state
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
    
            const element = document.querySelector('#error-message');
            if (element) {
                element.classList.remove('animate-shake');
                const offsetWidth = element.offsetWidth;
                console.log(offsetWidth);
                element.classList.add('animate-shake');
            }
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

                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-10/12 min-w-60'>
                        <CiUser className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
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
                            placeholder='New Password'
                        />
                    </div>

                    <button type="submit" onClick={handleSubmit} className={`border-[1px] border-custom-text hover:border-custom-hover hover:text-custom-hover rounded-lg p-2 px-8`}>
                        Update
                    </button>
                    <div className='flex justify-center'>
                        <div id="error-message" className={`absolute text-[20px] text-center ${messageClassName} ${showErrorModal ? 'visible animate-shake' : 'invisible'}`}>
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 mt-4 pb-4'>
                <button onClick={signOutUser} className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover w-fit mx-auto text-2xl font-medium py-2 px-8 hover:px-12 rounded-full shadow-lg no-select transition-all duration-200 ease-out">
                    Log Out
                </button>
                <button onClick={deleteAccount} className='text-red-200 hover:text-red-300 font-thin text-lg sm:text-xl p-1'>Delete Account</button>
            </div>
        </div>
    );
}

export default AccountPage;
