import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CiUser } from "react-icons/ci";

function Header() {
    const { user } = useContext(UserContext);

    return (
        <header className='w-full z-50 flex justify-between items-center font-medium h-[10vh] min-h-12 px-4 xl:px-[5vw] '>
            <Link to='/'>
                <div className="group flex items-center no-select">
                    <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className='text-gradient text-2xl sm:text-3xl'>Streaks</h1>
                </div>
            </Link>

            {user ? (
                <Link to='/account'>
                    <button className="flex items-center rounded-full text-custom-text hover:text-custom-hover bg-custom-light bg-opacity-85 backdrop-blur-md">
                        <div>
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-10 h-10 m-1 sm:m-2 object-cover rounded-full" />
                            ) : (
                                <CiUser className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                            )}
                        </div>
                        <div className='hidden sm:block lg:hidden text-lg sm:text-xl truncate max-w-48 mr-3+' title={user.displayName.split(' ')[0]}>
                            { user.displayName.split(' ')[0] }
                        </div>
                        <div className='hidden lg:block text-lg sm:text-xl truncate max-w-56 mr-3' title={user.displayName}>
                            { user.displayName }
                        </div>
                    </button>
                </Link>
                ) : (
                <Link to='/login'>
                    <button className="flex gap-2 items-center p-2 pl-2 pr-4 rounded-full text-custom-text hover:text-custom-hover bg-custom-light bg-opacity-85 backdrop-blur-md">
                        <div>
                            <CiUser className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                        </div>
                        <div className='text-lg sm:text-xl'>
                            Log in
                        </div>
                    </button>
                </Link>
            )}
        </header>
    );
};

export default Header;