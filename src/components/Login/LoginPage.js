import React, { useState } from 'react';
import './LoginPage.css';
import { CiUser, CiLock } from "react-icons/ci";
import { PiEyeLight , PiEyeSlashLight } from "react-icons/pi";
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';


const LoginPage = () => {
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(<PiEyeLight className="text-[#afb9c9]" />);
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        if (inputType === 'password') {
            setInputType('text');
            setIcon(<PiEyeSlashLight className="text-[#afb9c9]" />);
        } else {
            setInputType('password');
            setIcon(<PiEyeLight className="text-[#afb9c9]" />);
        }
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className="App h-screen w-full bg-gray-700 flex flex-col">
            <div className='mainPage flex flex-col h-4/5 gap-4 justify-between items-center bg-[#24334c] m-auto w-64 pt-4 pb-16 rounded-lg'>
                <p className='text-[#afb9c9] text-2xl border-b-[1px] p-2 border-[#afb9c9] text-center no-select'>Log In</p>
                <div className='flex flex-col items-center w-full'>
                    <div className='flex username-div border-b-[1px] border-[#afb9c9] hover:border-[#deeaff]'>
                        <CiUser className='text-[#afb9c9] h-full'/>
                        <input className='bg-[#24334c] text-[#afb9c9] p-2 pr-8 text-sm' type='text' placeholder='Username' />
                    </div>
                    <div className='flex password-div border-b-[1px] border-[#afb9c9] mt-4 relative'>
                        <CiLock className='text-[#afb9c9] h-full'/>
                        <input className='bg-[#24334c] text-[#afb9c9] p-2 pr-8 text-sm' type={inputType} placeholder='Password' />
                        <button onClick={togglePasswordVisibility} type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm leading-5">
                            {icon}
                        </button>
                        <div className='group flex items-center mt-2 cursor-pointer absolute inset-y-10 left-0 no-select' onClick={toggleRememberMe}>
                            {rememberMe 
                                ? <FaCheckSquare className="text-[#afb9c9] pr-1 group-hover:text-[#deeaff]"/> 
                                : <FaRegSquare className="text-[#afb9c9] pr-1 group-hover:text-[#deeaff]"/>
                            }
                            <p className='text-[10px] font-thin text-[#afb9c9] group-hover:text-[#deeaff]'>Remember Me</p>
                        </div>
                        <p className='text-[10px] font-thin text-[#afb9c9] mt-2 self-start absolute inset-y-8 right-0 no-select hover:text-[#deeaff]'>Forgot Password?</p>
                    </div>
                </div>
                <div>
                    <button className="bg-gradient-to-r from-custom-green to-custom-blue text-[#dce9fc] py-1 px-16 rounded-full shadow-lg hover:scale-[1.02]">Login</button>
                    <div className='flex gap-1 w-full justify-center font-thin text-[#afb9c9] mt-2'>
                        <p className='text-[10px]'>Don't have an account?</p>
                        <p className='text-[10px] font-medium'>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
