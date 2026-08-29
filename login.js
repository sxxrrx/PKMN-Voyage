import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

import {
    auth,
    db
} from "./firebase-config.js";


// =========================================================
// PKMN VOYAGE
// LOGIN
// =========================================================

const loginForm = document.getElementById("login-form");

const loginError = document.getElementById("login-error");
const loginSuccess = document.getElementById("login-success");

const submitButton =
    loginForm.querySelector('button[type="submit"]');


// =========================================================
// LOGIN
// =========================================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearMessages();


    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    submitButton.disabled = true;
    submitButton.textContent = "Logging In...";


    try {

        // -------------------------------------------------
        // FIREBASE AUTHENTICATION
        // -------------------------------------------------

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        // -------------------------------------------------
        // LOAD TRAINER RECORD
        // -------------------------------------------------

        const trainerRef =
            ref(
                db,
                `users/${user.uid}`
            );


        const trainerSnapshot =
            await get(trainerRef);


        if (!trainerSnapshot.exists()) {

            throw new Error(
                "trainer-record-not-found"
            );

        }


        const trainer =
            trainerSnapshot.val();


        console.log(
            "Trainer logged in:",
            trainer
        );


        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        showSuccess(
            `Welcome back, ${trainer.username}!`
        );


        // -------------------------------------------------
        // WHERE TO SEND THE PLAYER
        // -------------------------------------------------

        setTimeout(() => {

            if (trainer.characterCreated === false) {

                window.location.href =
                    "character-creator.html";

            }
            else {

                /*
                    Eventually this will become
                    the real game page.
                */

                window.location.href =
                    "game.html";

            }

        }, 800);


    }
    catch (error) {

        console.error(
            "Login error:",
            error
        );


        if (
            error.message ===
            "trainer-record-not-found"
        ) {

            showError(
                "Your account exists, but your Trainer data could not be found."
            );

        }
        else {

            showError(
                getFriendlyErrorMessage(
                    error.code
                )
            );

        }

    }
    finally {

        submitButton.disabled = false;
        submitButton.textContent =
            "Log In";

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


            if (!input) {
                return;
            }


            const isHidden =
                input.type === "password";


            input.type =
                isHidden
                    ? "text"
                    : "password";


            button.textContent =
                isHidden
                    ? "Hide"
                    : "Show";


            button.setAttribute(
                "aria-label",
                isHidden
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

    loginError.textContent = "";
    loginSuccess.textContent = "";

    loginError.classList.add("hidden");
    loginSuccess.classList.add("hidden");

}


function showError(message) {

    loginError.textContent = message;
    loginError.classList.remove("hidden");

}


function showSuccess(message) {

    loginSuccess.textContent = message;
    loginSuccess.classList.remove("hidden");

}


// =========================================================
// FIREBASE ERROR MESSAGES
// =========================================================

function getFriendlyErrorMessage(code) {

    switch (code) {

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/invalid-credential":
            return "The email or password you entered is incorrect.";

        case "auth/user-disabled":
            return "This Trainer account has been disabled.";

        case "auth/too-many-requests":
            return "Too many login attempts. Please wait a little while and try again.";

        case "auth/network-request-failed":
            return "We couldn't connect to Firebase. Please try again.";

        default:
            return "Something went wrong while logging in.";
    }

}
