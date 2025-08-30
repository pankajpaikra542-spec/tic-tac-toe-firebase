import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { 
    getAuth, 
    signInAnonymously, 
    onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { 
    getDatabase, 
    ref, 
    onValue, 
    runTransaction,
    set,
    onDisconnect,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Vy6Y5y3cfks88nddQ_YYyVbMvjSpFbc",
  authDomain: "tiktaktoe3-ea0e4.firebaseapp.com",
  databaseURL: "https://tiktaktoe3-ea0e4-default-rtdb.firebaseio.com",
  projectId: "tiktaktoe3-ea0e4",
  storageBucket: "tiktaktoe3-ea0e4.firebasestorage.app",
  messagingSenderId: "1081387966041",
  appId: "1:1081387966041:web:a226b64f5e2e7a594cdb48",
  measurementId: "G-9XDT6QS1M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Sign in anonymously
signInAnonymously(auth).catch((error) => {
    console.error("Anonymous sign-in failed:", error);
});

// Export Firebase services
export { auth, db, ref, onValue, runTransaction, set, onDisconnect, serverTimestamp, onAuthStateChanged };