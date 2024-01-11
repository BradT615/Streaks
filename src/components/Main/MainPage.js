import React from 'react';
import { Link } from 'react-router-dom';



const MainPage = () => {
    return (
        <div className='h-screen w-screen bg-custom-bg'>
            <div className='flex flex-col h-full m-auto justify-center text-center text-3xl'>
                <button>
                    <Link to='/login'>Login</Link>
                </button>
            </div>
        </div>
    );
};

export default MainPage;
