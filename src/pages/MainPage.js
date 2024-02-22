// MainPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';

function MainPage() {
    const [activeHabit, setActiveHabit] = useState(null);

    return (
        <div className='flex flex-col h-screen w-screen'>
            <Header />
            <div className='flex-grow text-custom-text mx-auto h-[95%]'>
                <div className='flex justify-center max-w-screen-xl h-full p-6 text-center gap-4 text-3xl'>
                    <HabitsList activeHabit={activeHabit} setActiveHabit={setActiveHabit} />
                    {activeHabit && <HabitStats activeHabit={activeHabit} />}
                </div>
            </div>
        </div>
    );
};

export default MainPage;