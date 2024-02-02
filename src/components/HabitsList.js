// HabitsList.js
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { db } from '../firebaseConfig';
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { CiCircleRemove } from "react-icons/ci";

function HabitsList({ setActiveHabit }) {
    const { user, guestUUID } = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [currentHabit, setCurrentHabit] = useState(null);


    // Fetch habits from Firestore
    const fetchHabits = async () => {
        let habitsRef;
        if (user) {
            habitsRef = collection(db, 'users', user.uid, 'habits');
        } else if (guestUUID) {
            habitsRef = collection(db, 'guests', guestUUID, 'habits');
        }

        if (habitsRef) {
            const habitsSnapshot = await getDocs(habitsRef);
            const habits = habitsSnapshot.docs.map(doc => ({ name: doc.data().name, order: doc.data().order }));
            habits.sort((a, b) => a.order - b.order);
            const habitNames = habits.map(habit => habit.name);
            setItems(habitNames);
            setCurrentHabit(habitNames[0]);
        }
    };

    // Store habits in Firestore
    const storeHabits = async (habits) => {
        let habitsRef;
        if (user) {
            habitsRef = collection(db, 'users', user.uid, 'habits');
        } else if (guestUUID) {
            habitsRef = collection(db, 'guests', guestUUID, 'habits');
        }

        if (habitsRef) {
            // First, delete all existing habits
            const existingHabitsSnapshot = await getDocs(habitsRef);
            const batch = writeBatch(db);
            existingHabitsSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            // Then, add the new list of habits
            habits.forEach((habit, index) => {
                const habitRef = doc(habitsRef, habit);
                batch.set(habitRef, { name: habit, order: index });
            });

            return batch.commit();
        }
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            const updatedItems = [...items, newItem];
            setItems(updatedItems);
            storeHabits(updatedItems);
            setNewItem('');
            setCurrentHabit(newItem);
        }
    };
    
    const handleRemoveItem = (itemToRemove) => {
        const updatedItems = items.filter(item => item !== itemToRemove);
        setItems(updatedItems);
        storeHabits(updatedItems);
        if (currentHabit === itemToRemove) {
            setCurrentHabit(updatedItems[0]);
        }
    };

    const handleItemClick = (item) => {
        setCurrentHabit(item);
    };

    // Fetch habits when component mounts
    useEffect(() => {
        fetchHabits();
    }, [user, guestUUID]);

    return (
        <div className='border-[1px] border-custom-hover w-full md:w-1/2 rounded-lg'>
            <h1>TEST DEPLOY</h1>
            <div className='mt-2 flex flex-col justify-center'>
                <h1 className='font-medium border-b-[1px] mb-4 w-fit max-sm:border-custom-text max-sm:hover:border-custom-hover max-sm:hover:text-custom-hover no-select self-center'>Habits</h1>
                <div className='flex flex-col w-full justify-center gap-4'>
                    <div>
                        <input className='bg-[#486898] mr-4' value={newItem} onChange={e => setNewItem(e.target.value)} />
                        <button onClick={handleAddItem} className='hover:text-custom-hover'>Add Item</button>
                    </div>
                    <ul>
                        {items.map((item, index) => (
                            <div 
                                key={index} 
                                className='relative group'
                            >
                                <li 
                                    onClick={() => handleItemClick(item)}
                                    className={`cursor-pointer my-1 w-fit mx-auto p-2 px-4 rounded-lg no-select ${item === currentHabit ? 'border-2 text-custom-hover border-custom-hover' : 'border-2 border-custom-bg hover:border-[#b1bbcc] hover:text-[#b1bbcc]'}`}
                                >
                                    {item}
                                </li>
                                <CiCircleRemove
                                    onClick={() => handleRemoveItem(item)}
                                    className='absolute right-20 text-4xl top-0 mt-2 mr-2 text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
                                />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HabitsList;