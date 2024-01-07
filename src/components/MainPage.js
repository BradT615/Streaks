import React from 'react';

const MainPage = () => {
    return (
        <div className="App h-screen w-full bg-gray-700 flex flex-col">
            {/* <h1 className='text-center text-6xl text-[#afb9c9]'>Streaks</h1> */}

            <div className='flex flex-col h-4/5 gap-4 justify-between items-center border-[1px] border-[#afb9c9] shadow-2xl bg-[#24334c] m-auto w-64 pt-4 pb-16 rounded-lg'>
                <p className='text-[#afb9c9] text-2xl border-b-[1px] p-2 border-[#afb9c9] text-center w-11/12'>Streaks Login</p>
                <div className='flex flex-col items-center gap-4'>
                    <input className='bg-[#24334c] text-[#afb9c9] border-[1px] border-[#afb9c9] rounded-full p-2 pr-10 text-sm' type='text' placeholder='Username' />
                    <input className='bg-[#24334c] text-[#afb9c9] border-[1px] border-[#afb9c9] rounded-full p-2 pr-10 text-sm' type='password' placeholder='Password' />
                </div>
                <div>
                    <button class="bg-gradient-to-r from-custom-green to-custom-blue text-[#dce9fc] py-1 px-16 rounded-full shadow-lg">Login</button>
                    <p className='text-xs font-thin text-[#afb9c9] text-center mt-4'>Forgot Password?</p>
                </div>
                
            </div>
        </div>
    );
};

export default MainPage;
