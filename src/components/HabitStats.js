// HabitsStats.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ReactCalendar from 'react-calendar';
import { db } from '../firebaseConfig';
import { collection, doc, query, orderBy, setDoc, onSnapshot } from "firebase/firestore";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './Calendar.css';

function HabitsStats({ activeHabit }) {
    const { user, guestUUID } = useContext(UserContext);
    const [value, onChange] = useState(new Date());
    const [habitData, setHabitData] = useState({});
    const [currentDate, setCurrentDate] = useState(null);
    const [notes, setNotes] = useState('');

    const addDate = async (date, success = false, notes = null) => {
        if (!activeHabit) return
        let datesCollection;
        if (user) {
            datesCollection = collection(db, 'users', user.uid, 'habits', activeHabit, 'dates');
        } else if (guestUUID) {
            datesCollection = collection(db, 'guests', guestUUID, 'habits', activeHabit, 'dates');
        }

        if (datesCollection) {
            const dateDoc = doc(datesCollection, date.toISOString().split('T')[0]);
            await setDoc(dateDoc, { date, success, notes }, { merge: true });
        }
    };

    const tileClassName = ({ date, view }) => {
        // Add class to dates with habit data
        if (activeHabit && view === 'month') {
            const dateKey = date.toISOString().split('T')[0];
            if (habitData[dateKey]) {
                return habitData[dateKey].success ? 'success-day' : 'habit-day';
            }
        }
    };

    // Fetch dates from Firestore
    const fetchDates = useCallback(() => {
        if (!activeHabit) return;
        let datesCollection;
        if (user) {
            datesCollection = collection(db, 'users', user.uid, 'habits', activeHabit, 'dates');
        } else if (guestUUID) {
            datesCollection = collection(db, 'guests', guestUUID, 'habits', activeHabit, 'dates');
        }

        if (datesCollection) {
            const datesQuery = query(datesCollection, orderBy('date'));
            const unsubscribe = onSnapshot(datesQuery, (snapshot) => {
                const dates = snapshot.docs.map(doc => ({...doc.data(), date: doc.id}));
                setHabitData(dates.reduce((acc, date) => ({ ...acc, [date.date]: date }), {}));
            });

            // Clean up the subscription on unmount
            return () => unsubscribe();
        }
    }, [user, guestUUID, activeHabit]);

    useEffect(() => {
        const unsubscribe = fetchDates();
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [fetchDates]);

    const submitNotes = async () => {
        if (!activeHabit || !currentDate) return;
        if (currentDate) {
            let dateDocRef;
            if (user) {
                dateDocRef = doc(db, 'users', user.uid, 'habits', activeHabit, 'dates', currentDate.toISOString().split('T')[0]);
            } else {
                dateDocRef = doc(db, 'guests', guestUUID, 'habits', activeHabit, 'dates', currentDate.toISOString().split('T')[0]);
            }
            await setDoc(dateDocRef, { date: currentDate, notes: notes }, { merge: true });
        }
    };
    
    useEffect(() => {
        if (currentDate && activeHabit) {
            let dateDocRef;
            if (user) {
                dateDocRef = doc(db, 'users', user.uid, 'habits', activeHabit, 'dates', currentDate.toISOString().split('T')[0]);
            } else if (guestUUID) {
                dateDocRef = doc(db, 'guests', guestUUID, 'habits', activeHabit, 'dates', currentDate.toISOString().split('T')[0]);
            }
    
            if (dateDocRef) {
                const unsubscribe = onSnapshot(dateDocRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        setNotes(data.notes || '');
                    } else {
                        setNotes('');
                    }
                });
    
                return unsubscribe;
            }
        }
    }, [user, guestUUID, activeHabit, currentDate]);
    
    return (
        <div className='flex flex-col justify-between w-2/3 h-full max-lg:hidden gap-4'>
            <div className='flex flex-col border-2'> {/* Adjusted this line */}
                <ReactCalendar
                    onChange={date => { onChange(date); setCurrentDate(date); }}
                    value={value}
                    tileClassName={tileClassName}
                    calendarType="gregory"
                    maxDetail="month"
                    minDetail="year"
                    showFixedNumberOfWeeks={true}
                    next2Label={null}
                    prev2Label={null}
                    nextLabel={<IoIosArrowForward />}
                    prevLabel={<IoIosArrowBack />}
                    tileContent={({ date, view }) => {
                        if (view === 'month') {
                            const dateKey = date.toISOString().split('T')[0];
                            return habitData[dateKey] && habitData[dateKey].notes ? <div className="dot" /> : null;
                        }
                        return null;
                    }}
                />
                <button onClick={() => addDate(currentDate, true, notes)} className='bg-green-600 text-white rounded-lg p-2 mt-2 w-full hover:bg-green-500'>Set Success</button>
            </div>
            <div className='flex-grow p-4 border-2 overflow-auto'>
                <h1 className='font-medium border-b-[1px] mb-4 w-fit max-sm:border-custom-text max-sm:hover:border-custom-hover max-sm:hover:text-custom-hover no-select self-center'>Notes</h1>
                <div className='flex flex-col w-full justify-center gap-4'>
                    <div>
                        <input type="text" value={notes} onChange={e => setNotes(e.target.value)} />
                        <button onClick={submitNotes}>Submit Notes</button>
                    </div>
                    <p>{notes}</p>
                </div>
            </div>
        </div>
    );
    
}

export default HabitsStats;