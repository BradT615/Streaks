// HabitsList.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { db } from '../firebaseConfig';
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { CiCircleRemove } from "react-icons/ci";
import { FiCheck } from "react-icons/fi";

function HabitsList({ activeHabit, setActiveHabit }) {
    const { user, guestUUID } = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [highlightedItem, setHighlightedItem] = useState(null);
    const [editingHabit, setEditingHabit] = useState(null);
    const [editedHabitName, setEditedHabitName] = useState('');



    // Fetch habits from Firestore
    const fetchHabits = useCallback(async () => {
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
            setActiveHabit(habitNames[0]);
        }
    }, [user, guestUUID, setActiveHabit]);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

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
            if (items.includes(newItem)) {
                setHighlightedItem(newItem);
                setTimeout(() => setHighlightedItem(null), 400);
            } else {
                const updatedItems = [...items, newItem];
                setItems(updatedItems);
                storeHabits(updatedItems);
                setNewItem('');
                setActiveHabit(newItem);
            }
        }
    };

    const handleRemoveItem = (itemToRemove) => {
        const updatedItems = items.filter(item => item !== itemToRemove);
        setItems(updatedItems);
        storeHabits(updatedItems);
        if (activeHabit === itemToRemove) {
            setActiveHabit(updatedItems[0]);
        }
    };

    const handleEditHabit = (habit) => {
        setEditingHabit(habit);
        setEditedHabitName(habit);
    };

    const handleSaveEdit = async () => {
        const updatedItems = items.map(item => item === editingHabit ? editedHabitName : item);
        setItems(updatedItems);
        await storeHabits(updatedItems);
        setEditingHabit(null);
    };
    

    const handleItemClick = (item) => {
        setActiveHabit(item);
    };

    return (
        <div className={`w-full p-4 ${activeHabit ? 'lg:w-1/3' : ''} border-2 rounded-lg`}>
            <div className='flex flex-col justify-center'>
                <h1 className='mb-4 w-fit max-sm:hover:text-custom-hover no-select'>Habits</h1>
                <div className='flex flex-col w-full justify-center gap-4'>
                    <div className='flex gap-4 items-center justify-center'>
                        <input className='h-full p-1 w-full border-2' value={newItem} onChange={e => setNewItem(e.target.value)} />
                        <FiCheck className=' cursor-pointer' onClick={handleAddItem} />
                    </div>
                    <ul>
                        {items.map((item, index) => (
                            <div key={index} className='relative group text-left'>
                                {editingHabit === item ? (
                                    <input
                                        value={editedHabitName}
                                        onChange={e => setEditedHabitName(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSaveEdit()}
                                    />
                                ) : (
                                    <li 
                                        onClick={() => handleItemClick(item)}
                                        className={`cursor-pointer my-3 bg-[#353b4a] w-full mx-auto p-3 px-4 rounded-lg no-select transition-colors duration-200 ease-out ${item === activeHabit ? 'border-2 text-custom-hover border-custom-hover' : 'border-2 border-custom-bg hover:border-[#b1bbcc] hover:text-[#b1bbcc]'} ${item === highlightedItem ? 'text-red-500' : ''}`}
                                    >
                                        {item}
                                    </li>
                                )}
                                <div className='absolute right-0 text-4xl flex items-center justify-center gap-4 top-0 mt-2 mr-2 opacity-0 group-hover:opacity-100'>
                                    <button onClick={() => handleEditHabit(item)} className='hover:text-custom-hover'>Edit</button>
                                    <CiCircleRemove
                                        onClick={() => handleRemoveItem(item)}
                                        className='text-red-400 hover:text-red-500'
                                    />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HabitsList;