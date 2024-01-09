import React, { useState } from 'react';
import './LoginPage.css';
import logo from './logo.png';
import { CiUser, CiLock } from "react-icons/ci";
import { PiEyeLight , PiEyeSlashLight } from "react-icons/pi";
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';


const LoginPage = () => {
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(<PiEyeLight className="text-[#afb9c9] hover:text-[#deeaff]" />);
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        if (inputType === 'password') {
            setInputType('text');
            setIcon(<PiEyeSlashLight className="text-[#afb9c9] hover:text-[#deeaff]" />);
        } else {
            setInputType('password');
            setIcon(<PiEyeLight className="text-[#afb9c9] hover:text-[#deeaff]" />);
        }
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className="h-screen w-full bg-[#24344c] flex flex-col text-2xl">
            <div className='LoginPage flex flex-col gap-4 justify-around items-center m-auto py-8 w-full sm:max-w-lg h-full sm:h-4/5'>
                <div>
                    <img src={logo} className='w-1/3 mx-auto mb-4'></img>
                    <p className='text-[#afb9c9] text-4xl text-center no-select'>Streaks</p>
                </div>
                
                <div className='flex flex-col items-center w-full pb-16'>
                    <div className='group flex username-div border-b-[1px] border-[#afb9c9] hover:border-[#deeaff] w-3/4 min-w-72'>
                        <CiUser className='text-[#afb9c9] group-hover:text-[#deeaff] h-full sm:w-8'/>
                        <input className='bg-[#24334c] text-[#afb9c9] p-2 pr-8 text-xl group-hover:text-[#deeaff] outline-none' type='text' placeholder='Username' />
                    </div>

                    <div className='group flex password-div border-b-[1px] border-[#afb9c9] hover:border-[#deeaff] mt-6 relative w-3/4 min-w-72'>
                        <CiLock className='text-[#afb9c9] group-hover:text-[#deeaff] h-full sm:w-8'/>
                        <input className='bg-[#24334c] text-[#afb9c9] group-hover:text-[#deeaff] p-2 pr-8 text-xl outline-none' type={inputType} placeholder='Password' />
                        <button onClick={togglePasswordVisibility} type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm sm:text-xl leading-5 outline-none">
                            {icon}
                        </button>
                    </div>

                    <div className='flex justify-around w-full px-2'>
                        <div className='group/nested flex items-center mt-2 cursor-pointer no-select' onClick={toggleRememberMe}>
                            {rememberMe 
                                ? <FaCheckSquare className="text-[#afb9c9] pr-1 group-hover/nested:text-[#deeaff] h-3 sm:h-4"/> 
                                : <FaRegSquare className="text-[#afb9c9] pr-1 group-hover/nested:text-[#deeaff] h-3 sm:h-4"/>
                            }
                            <p className='text-sm sm:text-lg font-thin text-[#afb9c9] group-hover/nested:text-[#deeaff]'>Remember Me</p>
                        </div>
                        <p className='text-sm sm:text-lg font-thin text-[#afb9c9] mt-2 no-select hover:text-[#deeaff]'>Forgot Password?</p>
                    </div>
                </div>
                <div>
                    <button className="bg-gradient-to-r from-custom-green to-custom-blue text-[#dce9fc] font-medium py-2 px-16 w-full rounded-full shadow-lg hover:scale-105 transition-transform">Log In</button>
                    <div className='flex gap-1 w-full justify-center text-[#afb9c9] mt-2'>
                        <p className='text-sm sm:text-lg font-thin'>Don't have an account?</p>
                        <p className='text-sm sm:text-lg font-medium hover:text-[#deeaff] no-select'>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
