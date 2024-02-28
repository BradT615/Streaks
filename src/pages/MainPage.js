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
            <div className='card text-custom-text max-w-screen-xl border-2 min-h-[85vh] lg:min-h-[50vh] self-center lg:p-8 m-4 bg-custom-light bg-opacity-85 backdrop-blur-md rounded-lg shadow-lg'>
                <div className='flex justify-center p-6 text-center gap-6 text-3xl'>
                    <HabitsList activeHabit={activeHabit} setActiveHabit={setActiveHabit} />
                    {activeHabit && <HabitStats activeHabit={activeHabit} />}
                </div>
            </div>
            <footer className='hidden lg:block h-24'></footer>
        </div>
    );
};

export default MainPage;