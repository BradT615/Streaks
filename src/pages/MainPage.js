import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';



const MainPage = () => {
    return (
        <div className='flex flex-col h-screen w-screen bg-custom-bg'>
            <Header />
            <div className='flex-grow overflow-hidden'>
                <div className='flex flex-col h-full justify-center text-center text-3xl'>
                    <button>
                        <Link to='/login'>Login</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};


export default MainPage;
