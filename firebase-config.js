import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "pkmn-voyage.firebaseapp.com",
  databaseURL: "https://pkmn-voyage-default-rtdb.firebaseio.com",
  projectId: "pkmn-voyage",
  storageBucket: "pkmn-voyage.firebasestorage.app",
  messagingSenderId: "794421454639",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getDatabase(app);

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "pkmn-voyage.firebaseapp.com",

    databaseURL:
        "https://pkmn-voyage-default-rtdb.firebaseio.com",

    projectId:
        "pkmn-voyage",

    storageBucket:
        "pkmn-voyage.firebasestorage.app",

    messagingSenderId:
        "794421454639",

    appId:
        "YOUR_APP_ID"

};


const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


export {
    app,
    auth
};
