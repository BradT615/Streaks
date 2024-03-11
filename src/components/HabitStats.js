// HabitsStats.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ReactCalendar from 'react-calendar';
import { db } from '../firebaseConfig';
import { collection, doc, query, orderBy, setDoc, onSnapshot } from "firebase/firestore";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiPlus, FiEdit, FiCheck } from "react-icons/fi";
import { LuUndo2 } from "react-icons/lu";
import './Calendar.css';

function HabitsStats({ activeHabit }) {
    const { user, guestUUID } = useContext(UserContext);
    const [value, onChange] = useState(new Date());
    const [habitData, setHabitData] = useState({});
    const [notes, setNotes] = useState('');
    const [showAddNote, setShowAddNote] = useState(false);
    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [isAddingNotes, setIsAddingNotes] = useState(false); // New state variable
    const [initialNotes, setInitialNotes] = useState('');
    const [currentDate, setCurrentDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    });

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
        if (activeHabit && view === 'month') {
            const dateKey = date.toISOString().split('T')[0];
    
            if (habitData[dateKey]) {
                const isSuccessDay = habitData[dateKey].success;
                let className = isSuccessDay ? 'success-day' : 'habit-day';
    
                if (isSuccessDay) {
                    const prevDate = new Date(date.getTime() - (24 * 60 * 60 * 1000));
                    const nextDate = new Date(date.getTime() + (24 * 60 * 60 * 1000));
                    const prevDateKey = prevDate.toISOString().split('T')[0];
                    const nextDateKey = nextDate.toISOString().split('T')[0];
                    const prevIsSuccessDay = habitData[prevDateKey]?.success || false;
                    const nextIsSuccessDay = habitData[nextDateKey]?.success || false;
    
                    if (!prevIsSuccessDay && !nextIsSuccessDay) {
                        className += ' rounded-full';
                    } else if (!prevIsSuccessDay) {
                        className += ' rounded-l-full';
                    } else if (!nextIsSuccessDay) {
                        className += ' rounded-r-full';
                    }
                }
    
                return className;
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
    const handleEditNotes = () => {
        setIsEditingNotes(true);
        setInitialNotes(notes);
    };
    const cancelEditNotes = () => {
        setIsEditingNotes(false);
        setNotes(initialNotes);
    };
    const submitEditedNotes = () => {
        submitNotes();
        setIsEditingNotes(false);
        setIsEditingNotes(false);
        setInitialNotes('');
    };
    const handleAddNotes = () => {
        setShowAddNote(true);
        setIsAddingNotes(true); // Set isAddingNotes to true
        setNotes(''); // Reset notes to an empty string
    };

    const submitAddedNotes = () => {
        submitNotes();
        setIsAddingNotes(false); // Set isAddingNotes to false
        setShowAddNote(false);
    };

    const cancelAddNotes = () => {
        setIsAddingNotes(false); // Set isAddingNotes to false
        setShowAddNote(false);
        setNotes(''); // Reset notes to an empty string
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
    useEffect(() => {
        setShowAddNote(false);
    }, [currentDate]);
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let formattedDate;
    if (currentDate) {
        formattedDate = `${monthNames[currentDate.getMonth()]}, ${currentDate.getDate()}`;
    } else {
        let currentDate = new Date();
        formattedDate = `${monthNames[currentDate.getMonth()]}, ${currentDate.getDate()}`;
    }
    return (
        <div className='flex flex-col justify-between w-2/3 h-full max-lg:hidden gap-2'>
            <div className='bg-custom-light bg-opacity-85 backdrop-blur-md rounded-lg card'>
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
            <div className="flex-grow p-4 overflow-auto bg-custom-light bg-opacity-85 backdrop-blur-md rounded-lg card relative flex flex-col">
                <div className="flex justify-between w-full mb-4">
                    <h1 className="no-select text-left w-1/3">Notes</h1>
                    <h1 className="no-select w-1/3">{formattedDate}</h1>
                    <div className="flex justify-end w-1/3 h-full text-4xl">
                        {notes ? (
                            <FiEdit onClick={handleEditNotes} />
                        ) : (
                            <FiPlus onClick={handleAddNotes} />
                        )}
                    </div>
                </div>
                <div className={`div-border ${(isEditingNotes || isAddingNotes) ? 'div-border-true' : 'div-border-false'} flex-grow flex flex-col text-left p-4 bg-transparent`}>
                    {isAddingNotes ? (
                        <textarea
                            className="w-full h-full bg-blue-400 outline-none resize-none"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && submitAddedNotes()}
                            onBlur={submitAddedNotes}
                            placeholder="Add Notes"
                        />
                    ) : isEditingNotes ? (
                        <textarea
                            className="w-full h-full bg-red-400 outline-none resize-none textarea-editable"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && submitEditedNotes()}
                            onBlur={submitEditedNotes}
                            disabled={!isEditingNotes}
                        />
                    ) : notes ? (
                        <div className="w-full h-full bg-green-400">
                            <p>{notes}</p>
                        </div>
                    ) : null}
                </div>
                {(isEditingNotes || isAddingNotes) && (
                    <div className='absolute flex bottom-6 right-6 text-4xl'>
                        {isAddingNotes ? (
                            <>
                                <LuUndo2 className="hover:text-custom-hover m-2" onClick={cancelAddNotes} />
                                <FiCheck className="hover:text-custom-hover m-2" onClick={submitAddedNotes} />
                            </>
                        ) : (
                            <>
                                <LuUndo2 className="hover:text-custom-hover m-2" onClick={cancelEditNotes} />
                                <FiCheck className="hover:text-custom-hover m-2" onClick={submitEditedNotes} />
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HabitsStats;