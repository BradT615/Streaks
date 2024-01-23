// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3pU1I_3tuMTJZx1Qd_nBlJW8Bq62YnNA",
  authDomain: "bradt615-streaks.firebaseapp.com",
  projectId: "bradt615-streaks",
  storageBucket: "bradt615-streaks.appspot.com",
  messagingSenderId: "341406663356",
  appId: "1:341406663356:web:ec4558ccd073df7a2706b9",
  measurementId: "G-MHK8J49JF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
