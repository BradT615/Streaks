import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Calendar from '../components/Calendar';
import Notes from '../components/Notes';

const MainPage = () => {
    const [visitorData, setVisitorData] = useState(null);

    useEffect(() => {
    fetch(`/.netlify/functions/initialize`)
        .then(response => response.json())
        .then(data => {
            setVisitorData(data);
            localStorage.setItem('visitorUUID', data.uuid);
        });
    }, []);

    if (!visitorData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col h-screen w-screen bg-custom-bg'>
            <Header />
            <div className='flex-grow text-custom-text'>
                <div className='flex justify-center h-[95%] max-w-screen-2xl mx-auto p-6 text-center gap-4 text-3xl'>
                    <div className='border-[1px] border-custom-hover w-full sm:w-1/2 rounded-lg'>
                    <Main />
                    </div>
                    <div className='flex flex-col w-1/2 max-sm:hidden gap-4'>
                        <div className='border-2 h-1/2 rounded-lg'>
                            <Calendar />
                        </div>
                        <div className='border-2 h-1/2 rounded-lg'>
                            <Notes />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;