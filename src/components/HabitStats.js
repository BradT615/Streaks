import React, { useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ReactCalendar from 'react-calendar';
import { db } from '../firebaseConfig';
import { collection, doc, query, orderBy, setDoc, onSnapshot } from "firebase/firestore";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiPlus, FiEdit, FiCheck } from "react-icons/fi";
import './Calendar.css';

function HabitsStats({ activeHabit }) {
    const { user, guestUUID } = useContext(UserContext);
    const [value] = useState(new Date());
    const [habitData, setHabitData] = useState({});
    const [notes, setNotes] = useState('');
    const [mode, setMode] = useState('view');
    const [currentDate, setCurrentDate] = useState(() => new Date());

    const getDatesCollection = useCallback(() => {
        if (user) {
            return collection(db, 'users', user.uid, 'habits', activeHabit, 'dates');
        } else if (guestUUID) {
            return collection(db, 'guests', guestUUID, 'habits', activeHabit, 'dates');
        }
        return null;
    }, [user, guestUUID, activeHabit]);

    const addDate = async (date, success = false, notes = null) => {
        const datesCollection = getDatesCollection();
        if (!activeHabit || !datesCollection) return;
        const dateDoc = doc(datesCollection, date.toISOString().split('T')[0]);
        await setDoc(dateDoc, { date, success, notes }, { merge: true });
    };

    const tileClassName = ({ date, view }) => {
        if (activeHabit && view === 'month') {
          const dateKey = date.toISOString().split('T')[0];
          const currentDateKey = currentDate.toISOString().split('T')[0];
          const isCurrentDate = dateKey === currentDateKey;
          const isSuccessDay = habitData[dateKey]?.success;
      
          let className = 'rounded-full';
      
          if (isSuccessDay) {
            const prevDate = new Date(date.getTime() - (24 * 60 * 60 * 1000));
            const nextDate = new Date(date.getTime() + (24 * 60 * 60 * 1000));
            const prevDateKey = prevDate.toISOString().split('T')[0];
            const nextDateKey = nextDate.toISOString().split('T')[0];
            const prevIsSuccessDay = habitData[prevDateKey]?.success;
            const nextIsSuccessDay = habitData[nextDateKey]?.success;
      
            if (prevIsSuccessDay && nextIsSuccessDay) {
              className = 'success-day bg-[#47ffe7] text-black';
            } else if (prevIsSuccessDay) {
              className = 'success-day bg-[#47ffe7] rounded-r-full text-black';
            } else if (nextIsSuccessDay) {
              className = 'success-day bg-[#47ffe7] rounded-l-full text-black';
            } else {
              className += ' success-day bg-[#47ffe7] text-black';
            }
          } else if (habitData[dateKey]) {
            className += ' habit-day';
          }
      
          if (isCurrentDate) {
            className += ' selected-date bg-[#00b8d1] text-white';
          }
      
          return className;
        }
      };

    const fetchDates = useCallback(() => {
        const datesCollection = getDatesCollection();
        if (!activeHabit || !datesCollection) return;
        const datesQuery = query(datesCollection, orderBy('date'));
        const unsubscribe = onSnapshot(datesQuery, (snapshot) => {
            const dates = snapshot.docs.map(doc => ({ ...doc.data(), date: doc.id }));
            setHabitData(dates.reduce((acc, date) => ({ ...acc, [date.date]: date }), {}));
        });
        return unsubscribe;
    }, [getDatesCollection, activeHabit]);

    useEffect(() => {
        const unsubscribe = fetchDates();
        return () => unsubscribe && unsubscribe();
    }, [fetchDates]);

    const handleNotes = (mode) => {
        setMode(mode);
    };
    const submitNotes = async () => {
        const datesCollection = getDatesCollection();
        if (!activeHabit || !currentDate || !datesCollection) return;
        const dateDocRef = doc(datesCollection, currentDate.toISOString().split('T')[0]);
        await setDoc(dateDocRef, { date: currentDate, notes }, { merge: true });
    };
    const confirmNotes = () => {
        submitNotes();
        setMode('view');
    };

    useEffect(() => {
        const datesCollection = getDatesCollection();
        if (!activeHabit || !currentDate || !datesCollection) return;
        const dateDocRef = doc(datesCollection, currentDate.toISOString().split('T')[0]);
        const unsubscribe = onSnapshot(dateDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setNotes(data.notes || '');
            } else {
                setNotes('');
            }
        });
        return unsubscribe;
    }, [getDatesCollection, activeHabit, currentDate]);

    useEffect(() => {
        setMode('view');
    }, [currentDate]);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = currentDate ? `${monthNames[currentDate.getMonth()]}, ${currentDate.getDate()}` : null;

    return (
        <div className='flex flex-col justify-between w-2/3 h-full max-md:hidden gap-2'>
            <div className='bg-custom-light bg-opacity-85 backdrop-blur-md rounded-lg card'>
                <ReactCalendar
                    onChange={setCurrentDate}
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
            <div className="flex-grow p-3 lg:p-4 overflow-auto bg-custom-light bg-opacity-85 backdrop-blur-md rounded-lg card relative flex flex-col">
                <div className="flex justify-between items-center w-full mb-3 text-xl lg:text-2xl">
                    <h1 className="no-select text-left w-1/3">Notes</h1>
                    <h1 className="no-select w-1/3">{formattedDate}</h1>
                    <div className="flex justify-end w-1/3 text-3xl">
                        {notes ? (
                            <FiEdit onClick={() => handleNotes('edit')} />
                        ) : (
                            <FiPlus onClick={() => handleNotes('add')} />
                        )}
                    </div>
                </div>
                <div className={`div-border ${mode !== 'view' ? 'div-border-true' : 'div-border-false'} flex-grow flex flex-col text-left text-lg p-4 bg-transparent`}>
                    {mode === 'add' ? (
                        <textarea
                            className="w-full h-full outline-none resize-none bg-transparent"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && confirmNotes()}
                            onBlur={confirmNotes}
                            placeholder="Add Notes"
                        />
                    ) : mode === 'edit' ? (
                        <textarea
                            className="w-full h-full outline-none resize-none textarea-editable bg-transparent"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && confirmNotes()}
                            onBlur={confirmNotes}
                        />
                    ) : notes ? (
                        <div className="w-full h-full">
                            <p>{notes}</p>
                        </div>
                    ) : null}
                </div>
                {mode !== 'view' && (
                    <FiCheck className="absolute flex bottom-0 right-0 text-4xl hover:text-custom-hover m-10" onClick={confirmNotes} />
                )}
            </div>
        </div>
    );
}

export default HabitsStats;