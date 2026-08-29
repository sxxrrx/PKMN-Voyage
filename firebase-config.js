import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";


// =========================================================
// PKMN VOYAGE - FIREBASE
// =========================================================

const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "pkmn-voyage.firebaseapp.com",
    databaseURL: "https://pkmn-voyage-default-rtdb.firebaseio.com",
    projectId: "pkmn-voyage",
    storageBucket: "pkmn-voyage.firebasestorage.app",
    messagingSenderId: "794421454639",
    appId: "YOUR_ACTUAL_APP_ID"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase services
const auth = getAuth(app);
const db = getDatabase(app);


// Make them available to other files
export {
    app,
    auth,
    db
};
