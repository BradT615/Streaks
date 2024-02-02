// HabitsList.js
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";

function HabitsList() {
    const { user, guestUUID } = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    // Fetch habits from Firestore
    const fetchHabits = async () => {
        let docRef;
        if (user) {
            docRef = doc(db, 'users', user.uid);
        } else if (guestUUID) {
            docRef = doc(db, 'guests', guestUUID);
        }

        if (docRef) {
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const habits = Object.values(docSnapshot.data());
                setItems(habits);
            } else {
                console.log('No such document!');
            }
        }
    };


    // Store habits in Firestore
    const storeHabits = async (habits) => {
        let docRef;
        if (user) {
            docRef = doc(db, 'users', user.uid);
        } else if (guestUUID) {
            docRef = doc(db, 'guests', guestUUID);
        }

        if (docRef) {
            const habitsObject = habits.reduce((obj, habit, index) => {
                obj[`habit${index + 1}`] = habit;
                return obj;
            }, {});

            return setDoc(docRef, habitsObject, { merge: true });
        }
    };

    const handleAddItem = () => {
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        storeHabits(updatedItems);
        setNewItem('');
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
                        <input className='bg-gray-400 text-black mr-4' value={newItem} onChange={e => setNewItem(e.target.value)} />
                        <button onClick={handleAddItem}>Add Item</button>
                    </div>
                    <ul>
                        {items.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HabitsList;