import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import { db } from '../firebaseConfig';
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import './Calendar.css';

function HabitsStats({ user, guestUUID, habitName }) {
  const [value, onChange] = useState(new Date());
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [habitData, setHabitData] = useState({});

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem('');
  };

  const tileClassName = ({ date, view }) => {
    // Add class to dates with habit data
    if (view === 'month' && habitData[date.toISOString().split('T')[0]]) {
      return 'habit-day';
    }
  };

  // Fetch dates from Firestore
  const fetchDates = async () => {
    let datesCollection;
    if (user) {
        datesCollection = collection(db, 'users', user.uid, 'habits', habitName, 'dates');
    } else if (guestUUID) {
        datesCollection = collection(db, 'guests', guestUUID, 'habits', habitName, 'dates');
    }

    if (datesCollection) {
        const datesQuery = query(datesCollection, orderBy('date'));
        const datesSnapshot = await getDocs(datesQuery);
        const dates = datesSnapshot.docs.map(doc => doc.data());
        setHabitData(dates.reduce((acc, date) => ({ ...acc, [date.date]: date }), {}));
    }
  };

  // Fetch dates when component mounts or habitName changes
  useEffect(() => {
    fetchDates();
  }, [user, guestUUID, habitName]);

  return (
    <div className='flex flex-col w-1/2 h-full max-md:hidden gap-4'>
      <div className='border-2 rounded-lg'>
        <ReactCalendar
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
          calendarType="gregory"
        />
      </div>
      <div className='border-2 rounded-lg h-full'>
        <h1 className='font-medium border-b-[1px] mb-4 w-fit max-sm:border-custom-text max-sm:hover:border-custom-hover max-sm:hover:text-custom-hover no-select self-center'>Notes</h1>
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
}

export default HabitsStats;