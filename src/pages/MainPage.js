// MainPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';

function MainPage() {
    const [activeHabit, setActiveHabit] = useState(null);

    return (
        <div className='flex flex-col w-full h-full m-8 border-2'>
            <Header />
            {/* <div className='card flex-grow text-custom-text mx-auto h-[95%] p-8 m-8 bg-custom-light bg-opacity-85 backdrop-blur-md rounded-lg shadow-lg'>
                <div className='flex justify-center max-w-screen-xl h-full p-6 text-center gap-8 text-3xl'>
                    <HabitsList activeHabit={activeHabit} setActiveHabit={setActiveHabit} />
                    {activeHabit && <HabitStats activeHabit={activeHabit} />}
                </div>
            </div> */}
        </div>
    );
};

export default MainPage;