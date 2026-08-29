import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";


// =========================================================
// PKMN VOYAGE - FIREBASE CONFIGURATION
// =========================================================

const firebaseConfig = {
    apiKey: "PASTE_YOUR_FIREBASE_API_KEY_HERE",
    authDomain: "pkmn-voyage.firebaseapp.com",
    databaseURL: "https://pkmn-voyage-default-rtdb.firebaseio.com",
    projectId: "pkmn-voyage",
    storageBucket: "pkmn-voyage.firebasestorage.app",
    messagingSenderId: "794421454639",
    appId: "PASTE_YOUR_FIREBASE_APP_ID_HERE"
};


// =========================================================
// INITIALIZE FIREBASE
// =========================================================

const app = initializeApp(firebaseConfig);


// =========================================================
// FIREBASE SERVICES
// =========================================================

const auth = getAuth(app);
const db = getDatabase(app);


// =========================================================
// EXPORT SERVICES
// =========================================================

export {
    app,
    auth,
    db
};
