import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [guestUUID, setGuestUUID] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
        let uuid = sessionStorage.getItem('guestUUID');
        if (!uuid) {
          // No UUID found
          uuid = uuidv4();
          sessionStorage.setItem('guestUUID', uuid);
  
          // Create a new document in the guests collection
          const guestRef = doc(db, 'guests/' + uuid);
          await setDoc(guestRef, {});
        }
        setGuestUUID(uuid);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, guestUUID }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };