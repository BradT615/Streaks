// HabitsList.js
import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { UserContext } from '../contexts/UserContext';
import { db } from '../firebaseConfig';
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { FiPlus, FiEdit, FiTrash, FiCheck } from "react-icons/fi";

function HabitsList({ activeHabit, setActiveHabit }) {
    const { user, guestUUID } = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [highlightedItem, setHighlightedItem] = useState(null);
    const [editingHabit, setEditingHabit] = useState(null);
    const [editedHabitName, setEditedHabitName] = useState('');
    const [newItemAdded, setNewItemAdded] = useState(false);
    const inputRef = useRef(null);

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
        if (!items.includes('')) {
            const updatedItems = [...items, ''];
            setItems(updatedItems);
            setEditingHabit(items.length);
            setNewItemAdded(true);
            setEditedHabitName('');
        }
    };

    useEffect(() => {
        if ((editingHabit !== null || newItemAdded) && inputRef.current) {
            inputRef.current.focus();
            setNewItemAdded(false);
        }
    }, [editingHabit, newItemAdded]);

    const handleEditHabit = (habit) => {
        const index = items.indexOf(habit);
        setEditingHabit(index);
        setEditedHabitName(habit);
    };
    const handleRemoveItem = (itemToRemove) => {
        const updatedItems = items.filter(item => item !== itemToRemove);
        setItems(updatedItems);
        storeHabits(updatedItems);
        if (activeHabit === itemToRemove) {
            setActiveHabit(updatedItems[0]);
        }
    };
    const handleSaveEdit = async () => {
        if (editedHabitName.trim() !== '') {
            if (items.includes(editedHabitName)) {
                setHighlightedItem(editedHabitName);
                setHighlightedItem(null);
            } else {
                const updatedItems = items.map((item, index) => index === editingHabit ? editedHabitName : item);
                setItems(updatedItems);
                await storeHabits(updatedItems);
                setActiveHabit(editedHabitName);
                setEditedHabitName('');
            }
        } else {
            const updatedItems = items.filter((item, index) => index !== editingHabit);
            setItems(updatedItems);
            await storeHabits(updatedItems);
        }
        setEditingHabit(null);
    };
    

    const handleItemClick = (item) => {
        if (item !== '') {
            setActiveHabit(item);
        }
    };

    return (
        <div className={`w-full p-4 ${activeHabit ? 'lg:w-1/3' : ''} rounded-lg relative bg-custom-light bg-opacity-85 backdrop-blur-md card`}>
            <div className='flex flex-col h-full'>
                <h1 className='mb-4 w-fit max-sm:hover:text-custom-hover no-select'>Habits</h1>
                <div className='flex flex-col w-full p-4 gap-4 text-xl div-border h-full'>
                    <ul>
                        {items.map((item, index) => (
                            <div 
                                key={index} 
                                className={`relative group text-left mb-5 py-4 px-2 border-2 ${item === activeHabit ? 'border-[#c3c5c8] card' : 'border-[#6c6d6e] hover:shadow-xl'} hover:border-custom-text hover:text-custom-hover`}
                                onClick={() => handleItemClick(item)}
                            >
                                {editingHabit === index ? (
                                    <input
                                        ref={inputRef}
                                        value={editedHabitName}
                                        onChange={e => setEditedHabitName(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSaveEdit()}
                                        onBlur={handleSaveEdit}
                                        className='border-2 rounded-none w-full'
                                    />
                                ) : (
                                    <li 
                                        className={`cursor-pointer w-2/3 p-1 rounded-lg no-select ${item === activeHabit ? 'text-custom-hover' : ''} ${item === highlightedItem ? 'text-green-500' : ''}`}
                                    >
                                        {item}
                                    </li>
                                )}
                                <div className='absolute right-0 text-3xl flex items-center justify-center gap-2 -top-4 bg-custom-light rounded-lg p-1 opacity-0 group-hover:opacity-100'>
                                    <FiEdit onClick={(e) => {e.stopPropagation(); handleEditHabit(item);}} className='text-custom-text hover:text-custom-hover' />
                                    <FiTrash onClick={(e) => {e.stopPropagation(); handleRemoveItem(item);}} className='text-red-400 hover:text-red-500' />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='absolute bottom-0 right-0 p-6 rounded-ee-lg'>
                <FiPlus size={40} className='cursor-pointer hover:text-custom-hover' onClick={handleAddItem} />
            </div>
        </div>
    );
};

export default HabitsList;