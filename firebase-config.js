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

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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