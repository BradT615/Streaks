import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
    const [isLoggedIn] = useState(false);

    return (
        <header className='flex justify-between items-center font-medium mx-[2vw] mt-2 md:mt-6'>
            <Link to='/'>
                <div className="group flex items-center no-select">
                    <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className='text-gradient text-2xl sm:text-3xl'>Streaks</h1>
                </div>
            </Link>

            {isLoggedIn ? (
                <Link to='/profile'>
                    <div className="bg-[#192737] p-2 px-4 rounded-full text-custom-text hover:text-custom-hover">
                        <button className='text-md sm:text-lg'>
                            Logged In
                        </button>
                    </div>
                </Link>
                ) : (
                <Link to='/login'>
                    <div className="bg-[#192737] p-2 px-4 rounded-full text-custom-text hover:text-custom-hover">
                        <button className='text-md sm:text-lg'>
                            Log In
                        </button>
                    </div>
                </Link>
            )}
        </header>
    );
};

export default Header;
