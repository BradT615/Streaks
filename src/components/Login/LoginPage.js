import React from 'react';
import './LoginPage.css';
import user from './assets/user.png';
import lock from './assets/lock.png';

const LoginPage = () => {
    return (
        <div className="App h-screen w-full bg-gray-700 flex flex-col">
            <div className='mainPage flex flex-col h-4/5 gap-4 justify-between items-center bg-[#24334c] m-auto w-64 pt-4 pb-16 rounded-lg'>
                <p className='text-[#afb9c9] text-2xl border-b-[1px] p-2 border-[#afb9c9] text-center w-11/12'>Streaks Login</p>
                <div className='flex flex-col items-center w-full'>
                    <div className='flex username-div'>
                        <img src={user}></img>
                        <input className='bg-[#24334c] text-[#afb9c9] border-b-[1px] border-[#afb9c9] p-2 pr-10 text-sm' type='text' placeholder='Username' />
                    </div>
                    <div className='password-div'>
                        <input className='bg-[#24334c] text-[#afb9c9] border-[1px] border-[#afb9c9] rounded-full mt-4 mb-1 p-2 pr-10 text-sm' type='password' placeholder='Password' />
                        <h6 className=' font-thin text-xs text-[#afb9c9] self-start ml-2'>Forgot Password?</h6>
                    </div>
                </div>
                <div>
                    <button class="bg-gradient-to-r from-custom-green to-custom-blue text-[#dce9fc] py-1 px-16 rounded-full shadow-lg">Login</button>
                    <p className='text-xs font-thin text-[#afb9c9] text-center mt-4'>Forgot Password?</p>
                </div>
                
            </div>
        </div>
    )
};

export default LoginPage;
