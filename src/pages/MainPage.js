import React, { useState } from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';

function MainPage() {
    const [activeHabit, setActiveHabit] = useState(null);

    return (
        <div className='flex flex-col justify-between w-full h-screen'>
            <Header />
            <div className='flex-grow text-custom-text sm:m-4'>
                <div className={`flex justify-between p-3 lg:p-6 text-center gap-2 text-3xl h-full ${activeHabit ? 'max-w-screen-xl' : 'max-w-lg'} mx-auto`}>
                    <HabitsList activeHabit={activeHabit} setActiveHabit={setActiveHabit} />
                    {activeHabit && <HabitStats activeHabit={activeHabit} className='h-full' />}
                </div>
            </div>
            <footer className='h-[1vh] lg:h-[7vh] min-h-12 px-4 xl:px-[1vw]'></footer>
        </div>
    );
};

export default MainPage;