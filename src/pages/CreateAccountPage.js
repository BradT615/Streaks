import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CiMail, CiUser, CiLock } from "react-icons/ci";
import { PiEyeLight , PiEyeSlashLight } from "react-icons/pi";
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';




const CreateAccountPage = () => {
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
            <div className='flex flex-col gap-4 justify-around items-center m-auto py-8 w-full max-w-lg'>
                <div className='no-select'>
                    <img src={logo} className='w-[130px] mx-auto mb-4'></img>
                    <p className='text-custom-text text-4xl text-center'>Streaks</p>
                </div>
                
                <div className='flex flex-col items-center w-full pb-16'>
                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-3/4 min-w-60'>
                        <CiMail className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input className='bg-custom-bg text-custom-text p-2 pr-8 text-xl hover:text-custom-hover focus:text-custom-hover outline-none w-full' type='text' placeholder='Email' />
                    </div>
                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover mt-6 w-3/4 min-w-60'>
                        <CiUser className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input className='bg-custom-bg text-custom-text p-2 pr-8 text-xl hover:text-custom-hover focus:text-custom-hover outline-none w-full' type='text' placeholder='Username' />
                    </div>

                    <div className='group flex password-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover mt-6 relative w-3/4 min-w-60'>
                        <CiLock className='text-custom-text group-hover:text-custom-hover group-focus-within:text-custom-hover h-full min-w-6 sm:w-8'/>
                        <input className='bg-custom-bg text-custom-text group-hover:text-custom-hover focus:text-custom-hover p-2 pr-8 text-xl outline-none w-full' type={inputType} placeholder='Password' />
                        <button onClick={togglePasswordVisibility} type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center text-lg sm:text-xl leading-5 outline-none group-focus-within:text-custom-hover">
                            {icon}
                        </button>
                    </div>
                    <div className='flex justify-between p-2 max-w-full'>
                        <div className='group/nested cursor-pointer pt-1 h-fit no-select' onClick={toggleRememberMe}>
                            {rememberMe 
                                ? <FaCheckSquare className="text-custom-text pr-2 group-hover/nested:text-custom-hover h-4"/> 
                                : <FaRegSquare className="text-custom-text pr-2 group-hover/nested:text-custom-hover h-4"/>
                            }                    
                        </div>
                        <div>
                            <p className='text-base font-thin text-custom-text text-center'>
                            I accept the 
                            <span className='font-medium hover:text-custom-hover'> Terms of Service </span>
                            <br className='min-[470px]:hidden'/>
                            and 
                            <span className='font-medium hover:text-custom-hover'> Privacy Policy</span>.
                            </p> 
                        </div>
                    </div>
                </div>
                <div className='font-thin text-sm sm:text-lg flex flex-col mb-20'>
                    <button className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover text-2xl font-medium py-2 px-4 hover:px-8 rounded-full shadow-lg no-select transition-all duration-200 ease-out">
                    <Link to='/email-verification'>Create Account</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;