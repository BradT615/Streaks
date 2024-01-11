import React, { useState } from 'react';
import logo from './logo.png';


const EmailVerificationPage = () => {
    return (
        <div className="h-screen w-full bg-custom-bg flex flex-col text-2xl">
            <div className='LoginPage flex flex-col gap-4 justify-around items-center m-auto py-8 w-full sm:max-w-lg h-full sm:h-4/5'>
                <div className='no-select'>
                    <img src={logo} className='w-1/3 mx-auto mb-4'></img>
                    <p className='text-custom-text text-4xl text-center'>Streaks</p>
                </div>
                <div className='flex flex-col items-center w-full pb-16'>
                    <div className='group flex username-div border-b-[1px] border-custom-text hover:border-custom-hover focus-within:border-custom-hover w-3/4 min-w-72'>
                        <input className='bg-custom-bg text-custom-text p-2 pr-8 text-xl hover:text-custom-hover focus:text-custom-hover outline-none' type='text' placeholder='Email' />
                    </div>
                </div>
                <div className='font-thin text-sm sm:text-lg flex flex-col mb-20'>
                    <button className="bg-gradient-to-r from-custom-green to-custom-blue text-custom-hover text-2xl font-medium py-2 px-4 hover:px-8 rounded-full shadow-lg no-select transition-all duration-200 ease-out">Verify</button>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
