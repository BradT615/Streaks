import React, { useState } from 'react';

function Main() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const handleAddItem = () => {
        setItems([...items, newItem]);
        setNewItem('');
    };

    return (
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
    );
};

export default Main;