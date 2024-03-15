import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';

function MainPage() {
    const [activeHabit, setActiveHabit] = useState(null);
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth >= 768);
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log('Active Habit:', activeHabit);
    }, [activeHabit]);

    useEffect(() => {
        console.log('Is Medium Screen:', isMediumScreen);
    }, [isMediumScreen]);

    return (
        <div className='flex flex-col justify-between w-full h-screen'>
            <Header />
            <div className='flex-grow text-custom-text sm:m-4'>
                <div className={`flex flex-col md:flex-row justify-between p-3 lg:p-6 text-center gap-2 text-3xl h-full ${activeHabit && isMediumScreen ? 'max-w-screen-xl' : 'max-w-lg'} mx-auto`}>
                    {!activeHabit || isMediumScreen ? (
                        <div className='w-full md:w-1/3 h-full p-3 lg:p-4 rounded-lg relative bg-custom-light bg-opacity-85 backdrop-blur-md card'>
                            <HabitsList activeHabit={activeHabit} setActiveHabit={setActiveHabit} />
                        </div>
                    ) : null}
                    {activeHabit && (
                        <div className={`flex flex-col justify-between ${isMediumScreen ? 'w-2/3' : 'w-full'} h-full gap-2`}>
                            <HabitStats
                                activeHabit={activeHabit}
                                className='h-full'
                                setActiveHabit={setActiveHabit}
                            />
                        </div>
                    )}
                </div>
            </div>
            <footer className='h-[1vh] lg:h-[7vh] min-h-12 px-4 xl:px-[1vw]'></footer>
        </div>
    );
};

export default MainPage;