// MainPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';

function MainPage() {
    const [activeHabit, setActiveHabit] = useState(null);

    return (
        <div className='flex flex-col h-screen w-screen bg-custom-bg'>
            <Header />
            <div className='flex-grow text-custom-text mx-auto h-[95%]'>
                <div className='flex justify-center max-w-screen-2xl h-full p-6 text-center gap-4 text-3xl'>
                    <HabitsList setActiveHabit={setActiveHabit} />
                    <HabitStats habitName={activeHabit ? activeHabit.name : null} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;