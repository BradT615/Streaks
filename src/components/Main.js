import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='mt-2 flex justify-center'>
            <h1 className='font-medium border-b-[1px] w-fit max-sm:border-custom-text max-sm:hover:border-custom-hover max-sm:hover:text-custom-hover no-select self-center'>Habits</h1>
        </div>
    );
};

export default Header;
