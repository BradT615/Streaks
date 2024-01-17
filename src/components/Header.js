import React, { useContext } from 'react';
import { EmailPrefixContext } from '../contexts/EmailPrefixContext';
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import logo from '../assets/logo.png';

function Header() {
    const { emailPrefix } = useContext(EmailPrefixContext);

    return (
        <header className='flex justify-between items-center font-medium mx-[2vw] mt-2 md:mt-6'>
            <Link to='/'>
                <div className="group flex items-center no-select">
                    <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className='text-gradient text-2xl sm:text-3xl'>Streaks</h1>
                </div>
            </Link>

            <Link to='/login'>
                <div className="group flex gap-1 justify-center items-center bg-[#192737] mt-1 p-2 pr-4 rounded-full">
                    <CiUser className='w-6 h-6 sm:w-8 sm:h-8 rounded-full'/>
                    <button className='text-md sm:text-lg text-custom-text group-hover:text-custom-hover'>
                        {emailPrefix ? emailPrefix : 'Log In'}
                    </button>
                </div>
            </Link>
            
        </header>
    );
};

export default Header;
