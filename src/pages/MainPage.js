import React from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';

function MainPage() {

    const habitData = {
        '2022-01-01': { didHabit: true, notes: 'Great start to the year!' },
        '2022-01-02': { didHabit: false, notes: 'Missed a day.' },
        // Add more dates as needed
    };

    return (
        <div className='flex flex-col h-screen w-screen bg-custom-bg'>
            <Header />
            <div className='flex-grow text-custom-text mx-auto h-[95%]'>
                <div className='flex justify-center max-w-screen-2xl h-full p-6 text-center gap-4 text-3xl'>
                    <HabitsList />
                    <HabitStats habitData={habitData} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;