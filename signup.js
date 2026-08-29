import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

import { auth, app } from "./firebase-config.js";


// =========================================================
// PKMN VOYAGE
// Signup
// =========================================================

const db = getDatabase(app);

const signupForm = document.getElementById("signup-form");

const signupError = document.getElementById("signup-error");
const signupSuccess = document.getElementById("signup-success");

const submitButton = signupForm.querySelector('button[type="submit"]');


// ---------------------------------------------------------
// SIGNUP
// ---------------------------------------------------------

signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearMessages();


    const username = document
        .getElementById("username")
        .value
        .trim();


    const homeRegion = document
        .getElementById("home-region")
        .value;


    const email = document
        .getElementById("email")
        .value
        .trim();


    const password = document
        .getElementById("password")
        .value;


    const confirmPassword = document
        .getElementById("confirm-password")
        .value;


    // -----------------------------------------------------
    // BASIC VALIDATION
    // -----------------------------------------------------

    if (password !== confirmPassword) {

        showError("Your passwords do not match.");

        return;
    }


    if (!homeRegion) {

        showError("Please choose your home region.");

        return;
    }


    // -----------------------------------------------------
    // DISABLE BUTTON WHILE ACCOUNT IS BEING CREATED
    // -----------------------------------------------------

    submitButton.disabled = true;

    submitButton.textContent = "Creating Trainer...";


    try {

        // -------------------------------------------------
        // CREATE FIREBASE AUTH ACCOUNT
        // -------------------------------------------------

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user = userCredential.user;


        // -------------------------------------------------
        // CREATE TRAINER DATABASE RECORD
        // -------------------------------------------------

        await set(
            ref(db, `users/${user.uid}`),
            {

                username: username,

                email: email,

                homeRegion: homeRegion,

                currentRegion: "kanto",

                characterCreated: false,

                createdAt: Date.now(),

                uid: user.uid

            }
        );


        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        showSuccess(
            "Trainer account created successfully!"
        );


        console.log(
            "Trainer created:",
            user.uid
        );


        /*
            Later this will redirect to:

            character-creator.html

            But for now we're leaving the user
            on this page so you can confirm
            everything saved correctly.
        */


    }
    catch (error) {

        console.error(
            "Signup error:",
            error
        );


        showError(
            getFriendlyErrorMessage(error.code)
        );

    }
    finally {

        submitButton.disabled = false;

        submitButton.textContent =
            "Create Trainer Account";

    }

});


// =========================================================
// PASSWORD SHOW / HIDE
// =========================================================

const passwordButtons =
    document.querySelectorAll(
        "[data-password-toggle]"
    );


passwordButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const targetId =
                button.dataset.passwordToggle;


            const input =
                document.getElementById(
                    targetId
                );


            if (!input) return;


            const hidden =
                input.type === "password";


            input.type =
                hidden
                    ? "text"
                    : "password";


            button.textContent =
                hidden
                    ? "Hide"
                    : "Show";


            button.setAttribute(
                "aria-label",
                hidden
                    ? "Hide password"
                    : "Show password"
            );

        }
    );

});


// =========================================================
// MESSAGE HELPERS
// =========================================================

function clearMessages() {

    signupError.textContent = "";

    signupSuccess.textContent = "";

    signupError.classList.add("hidden");

    signupSuccess.classList.add("hidden");

}


function showError(message) {

    signupError.textContent = message;

    signupError.classList.remove("hidden");

}


function showSuccess(message) {

    signupSuccess.textContent = message;

    signupSuccess.classList.remove("hidden");

}


// =========================================================
// FIREBASE ERROR MESSAGES
// =========================================================

function getFriendlyErrorMessage(code) {

    switch (code) {

        case "auth/email-already-in-use":
            return "That email already belongs to a Trainer account.";


        case "auth/invalid-email":
            return "Please enter a valid email address.";


        case "auth/weak-password":
            return "Your password is too weak.";


        case "auth/network-request-failed":
            return "We couldn't connect to the server. Please try again.";


        default:
            return "Something went wrong while creating your Trainer account.";

    }

}
