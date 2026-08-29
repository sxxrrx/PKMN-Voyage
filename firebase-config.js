import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";


// =========================================================
// PKMN VOYAGE - FIREBASE CONFIGURATION
// =========================================================

const firebaseConfig = {
    apiKey: "AIzaSyCn54dHLysy3usauST7L4b4uE2zqu79I64",
    authDomain: "pkmn-voyage.firebaseapp.com",
    databaseURL: "https://pkmn-voyage-default-rtdb.firebaseio.com",
    projectId: "pkmn-voyage",
    storageBucket: "pkmn-voyage.firebasestorage.app",
    messagingSenderId: "794421454639",
    appId: "1:794421454639:web:509555a6e6996b2b78e3da"
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
