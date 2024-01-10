import React, { useState } from 'react';
import logo from './logo.png';
import { CiUser, CiLock } from "react-icons/ci";
import { PiEyeLight , PiEyeSlashLight } from "react-icons/pi";
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';


const LoginPage = () => {
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(<PiEyeLight className="text-custom-text hover:text-custom-hover" />);
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        if (inputType === 'password') {
            setInputType('text');
            setIcon(<PiEyeSlashLight className="text-custom-text hover:text-custom-hover" />);
        } else {
            setInputType('password');
            setIcon(<PiEyeLight className="text-custom-text hover:text-custom-hover" />);
        }
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className="h-screen w-full bg-custom-bg flex flex-col text-2xl">
            <div className='LoginPage flex flex-col gap-4 justify-around items-center m-auto py-8 w-full sm:max-w-lg h-full sm:h-4/5'>
                <div className='no-select'>
                    <img src={logo} className='w-1/3 mx-auto mb-4'></img>
                    <p className='text-custom-text text-4xl text-center'>Streaks</p>
                </div>
                
                <div className='flex flex-col items-center w-full pb-16'>
                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-3/4 min-w-72'>
                        <CiUser className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full sm:w-8'/>
                        <input className='bg-custom-bg text-custom-text p-2 pr-8 text-xl hover:text-custom-hover focus:text-custom-hover outline-none' type='text' placeholder='Username' />
                    </div>

                    <div className='group flex password-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover mt-6 relative w-3/4 min-w-72'>
                        <CiLock className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full sm:w-8'/>
                        <input className='bg-custom-bg text-custom-text group-hover:text-custom-hover focus:text-custom-hover p-2 pr-8 text-xl outline-none' type={inputType} placeholder='Password' />
                        <button onClick={togglePasswordVisibility} type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm sm:text-xl leading-5 outline-none group-focus-within:text-custom-hover">
                            {icon}
                        </button>
                    </div>


                    <div className='flex justify-around w-full px-2'>
                        <div className='group/nested flex items-center mt-2 cursor-pointer no-select' onClick={toggleRememberMe}>
                            {rememberMe 
                                ? <FaCheckSquare className="text-custom-text pr-1 group-hover/nested:text-custom-hover h-3 sm:h-4"/> 
                                : <FaRegSquare className="text-custom-text pr-1 group-hover/nested:text-custom-hover h-3 sm:h-4"/>
                            }
                            <p className='text-sm sm:text-lg font-thin text-custom-text group-hover/nested:text-custom-hover'>Remember Me</p>
                        </div>
                        <p className='text-sm sm:text-lg font-thin text-custom-text mt-2 no-select hover:text-custom-hover'>Forgot Password?</p>
                    </div>
                </div>
                <div className='font-thin text-sm sm:text-lg flex flex-col'>
                    <button className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover text-2xl font-medium py-2 mx-6 hover:mx-2 rounded-full shadow-lg no-select transition-all duration-200 ease-out">Log In</button>
                    <div className='flex gap-1 w-full justify-center text-custom-text mt-2'>
                        <p>Don't have an account?</p>
                        <p className='font-medium hover:text-custom-hover no-select'>Sign Up</p>
                    </div>
                    <div className='flex items-center w-full justify-center text-custom-text -mt-2 no-select'>
                        <div className='flex-1 border-t border-custom-text'></div>
                        <p className='px-1 pb-1'>or</p>
                        <div className='flex-1 border-t border-custom-text'></div>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-custom-text hover:text-custom-hover -mt-3'>Continue as Guest</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
