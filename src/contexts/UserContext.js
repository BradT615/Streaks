// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore'; // Import getDoc
import { generateSampleData } from '../components/sampleDataGenerator';

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [guestUUID, setGuestUUID] = useState(null);
    const [loading, setLoading] = useState(true); // New state variable
  
    useEffect(() => {
        const generateGuestData = async (uuid) => {
            // Generate sample data
            const sampleData = generateSampleData();
          
            // Create a new document in the guests collection
            const guestRef = doc(db, 'guests', uuid);
            await setDoc(guestRef, {});
          
            // Add habits to the guest document
            const promises = [];
            for (const habitKey in sampleData) {
              const habitRef = doc(collection(guestRef, 'habits'), sampleData[habitKey].name);
              promises.push(setDoc(habitRef, { name: sampleData[habitKey].name, order: sampleData[habitKey].order }));
          
              // Add dates to the habit document
              for (const dateKey in sampleData[habitKey].dates) {
                const dateRef = doc(collection(habitRef, 'dates'), sampleData[habitKey].dates[dateKey].date);
                promises.push(setDoc(dateRef, sampleData[habitKey].dates[dateKey]));
              }
            }
          
            // Wait for all Firestore operations to complete
            await Promise.all(promises);
            setLoading(false); // Set loading to false after guest data has been generated
            return uuid;
          };

          const fetchGuestData = async (uuid) => {
            setLoading(true); // Set loading to true before fetching guest data
            const guestRef = doc(db, 'guests', uuid);
            const guestDoc = await getDoc(guestRef);
            if (guestDoc.exists()) {
                // Do something with the guest's data
                // For example, you could set it in a state variable
            }
            setLoading(false); // Set loading to false after guest data has been fetched
        };
          
          auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
              setUser(authUser);
              setLoading(false); // Set loading to false when user is authenticated
            } else {
              // User is signed out
              setUser(null);
              let uuid = sessionStorage.getItem('guestUUID');
              if (!uuid) {
                // No UUID found
                uuid = uuidv4();
                sessionStorage.setItem('guestUUID', uuid);
                setLoading(true); // Set loading to true before generating guest data
                await generateGuestData(uuid); // Wait for guest data to be generated
                setGuestUUID(uuid); // Then set the guest UUID
            } else {
                await fetchGuestData(uuid); // Fetch the guest's data
                setGuestUUID(uuid); // Then set the guest UUID
            }
        }
    });
}, []);

return (
    <UserContext.Provider value={{ user, guestUUID, loading }}>
        {children}
    </UserContext.Provider>
);
}

export { UserContext, UserProvider };