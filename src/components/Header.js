import React from 'react';
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import logo from '../assets/logo.png';

function Header() {
    return (
        <header className='flex justify-between items-center font-medium mx-[2vw] my-2 md:my-6'>
            <Link to='/'>
                <div className="group flex items-center no-select">
                    <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    <h1 className='text-gradient text-2xl sm:text-3xl'>Streaks</h1>
                </div>
            </Link>

            <Link to='/create-account'>
                <div className="group flex gap-1 justify-center items-center bg-[#192737] mt-1 p-2 pr-4 rounded-full">
                    <CiUser className='w-6 h-6 sm:w-8 sm:h-8 rounded-full'/>
                    <button className='text-md sm:text-lg text-custom-text group-hover:text-custom-hover'>Log In</button>
                </div>
            </Link>
            
        </header>
    );
};

export default Header;