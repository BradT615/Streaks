import React from 'react';

const MainPage = () => {
    return (
        <div className="App h-screen w-full bg-slate-600 flex flex-col">
            <h1>Streaks</h1>

            <div className='flex flex-col h-4/5 gap-4 justify-center items-center'>
                <p>Database Test</p>
                <button className='border-2 px-4'>Test</button>
            </div>
        </div>
    );
};

export default MainPage;
