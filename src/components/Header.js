import React from 'react';
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import logo from '../assets/logo.png';

function Header() {
    return (
        <header className='flex justify-between items-center font-medium mx-[2vw] my-2 md:my-6'>
            <div className="group flex items-center text-2xl sm:text-3xl no-select">
                <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                <h1 className='text-gradient'>Streaks</h1>
            </div>

            <div className="group flex gap-1 justify-center items-center bg-[#192737] mt-1 p-[2px] sm:p-2 pr-1 sm:pr-4 rounded-full">
                <CiUser className='w-6 h-6 sm:w-8 sm:h-8 border-[1px] rounded-full border-transparent text-custom-text group-hover:text-custom-hover'/>
                <button className='text-xs sm:text-lg text-custom-text group-hover:text-custom-hover'>Log In</button>
            </div>
        </header>
    );
};

export default Header;
