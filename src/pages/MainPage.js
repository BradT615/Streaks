// MainPage.js
import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import HabitsList from '../components/HabitsList';
import HabitStats from '../components/HabitStats';
import { UserContext } from '../contexts/UserContext';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

function MainPage() {
    const { user, guestUUID } = useContext(UserContext);
    const [activeHabit, setActiveHabit] = useState(null);

    // Fetch habits from Firestore
    const fetchHabits = async () => {
        let habitsCollection;
        if (user) {
            habitsCollection = collection(db, 'users', user.uid, 'habits');
        } else if (guestUUID) {
            habitsCollection = collection(db, 'guests', guestUUID, 'habits');
        }

        if (habitsCollection) {
            const habitsSnapshot = await getDocs(habitsCollection);
            const habits = habitsSnapshot.docs.map(doc => doc.data());
            setActiveHabit(habits[0]);
        }
    };

    // Fetch habits when component mounts
    useEffect(() => {
        fetchHabits();
    }, [user, guestUUID]);

    return (
        <div className='flex flex-col h-screen w-screen bg-custom-bg'>
            <Header />
            <div className='flex-grow text-custom-text mx-auto h-[95%]'>
                <div className='flex justify-center max-w-screen-2xl h-full p-6 text-center gap-4 text-3xl'>
                    <HabitsList activeHabit={activeHabit} setActiveHabit={setActiveHabit} />
                    <HabitStats habitName={activeHabit ? activeHabit.name : null} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;