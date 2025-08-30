# Multiplayer Tic-Tac-Toe with Firebase

A real-time multiplayer Tic-Tac-Toe game built with vanilla JavaScript and Firebase.

## Setup Instructions

### 1. Firebase Project Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Anonymous Authentication:
   - Go to Authentication > Sign-in method
   - Enable Anonymous provider
4. Create a Realtime Database:
   - Go to Realtime Database
   - Create database in test mode initially (rules will be updated later)
5. Get your Firebase configuration:
   - Go to Project settings > General > Your apps
   - Add a web app if you haven't already
   - Copy the configuration object

### 2. Update Firebase Configuration
Replace the placeholder values in `firebase-config.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
    databaseURL: "YOUR_ACTUAL_DATABASE_URL",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
