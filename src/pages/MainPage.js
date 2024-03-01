// MainPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';

function MainPage() {
    const [activeHabit, setActiveHabit] = useState(null);

    return (
        <div className='flex flex-col justify-between w-full min-h-screen'>
            <Header />
            <div className='text-custom-text shadow-none max-w-screen-xl flex-grow self-center lg:p-8 m-4 bg-custom-light bg-opacity-85 backdrop-blur-md rounded-lg card'>
                <div className='flex justify-center p-2 text-center gap-6 text-3xl'>
                    <HabitsList activeHabit={activeHabit} setActiveHabit={setActiveHabit} />
                    {activeHabit && <HabitStats activeHabit={activeHabit} />}
                </div>
            </div>
            <footer className='hidden lg:block h-[10vh] min-h-12 px-4 xl:px-[1vw]'></footer>
        </div>
    );
};

export default MainPage;