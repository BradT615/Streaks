import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const UserContext = React.createContext({
  user: null,
  setUser: () => {},
  guestUUID: null,
  setGuestUUID: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [guestUUID, setGuestUUID] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        let uuid = sessionStorage.getItem('guestUUID');
        if (!uuid) {
          uuid = uuidv4();
          sessionStorage.setItem('guestUUID', uuid);
        }
        setGuestUUID(uuid);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, guestUUID, setGuestUUID }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;