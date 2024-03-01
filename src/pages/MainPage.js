import React, { useState } from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';

function MainPage() {
    const [activeHabit, setActiveHabit] = useState(null);

    return (
        <div className='flex flex-col justify-between w-full h-screen'>
            <Header />
            <div className='flex-grow text-custom-text m-2 sm:m-4'>
                <div className='flex justify-between p-6 text-center gap-6 text-3xl h-full max-w-screen-xl mx-auto bg-custom-light bg-opacity-85 backdrop-blur-md rounded-lg card'>
                    <HabitsList activeHabit={activeHabit} setActiveHabit={setActiveHabit} className='h-full' />
                    {activeHabit && <HabitStats activeHabit={activeHabit} className='h-full' />}
                </div>
            </div>
            <footer className='lg:block h-[10vh] min-h-12 px-4 xl:px-[1vw]'></footer>
        </div>
    );
};

export default MainPage;
