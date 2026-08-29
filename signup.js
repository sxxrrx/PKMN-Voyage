import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    ref,
    set
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

import {
    auth,
    db
} from "./firebase-config.js";


// =========================================================
// PKMN VOYAGE
// SIGNUP
// =========================================================

const signupForm = document.getElementById("signup-form");
const signupError = document.getElementById("signup-error");
const signupSuccess = document.getElementById("signup-success");

const submitButton = signupForm.querySelector('button[type="submit"]');


// =========================================================
// CREATE ACCOUNT
// =========================================================

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
    // VALIDATION
    // -----------------------------------------------------

    if (!username) {
        showError("Please choose a Trainer name.");
        return;
    }

    if (!homeRegion) {
        showError("Please choose your home region.");
        return;
    }

    if (password !== confirmPassword) {
        showError("Your passwords do not match.");
        return;
    }


    // -----------------------------------------------------
    // DISABLE BUTTON WHILE CREATING ACCOUNT
    // -----------------------------------------------------

    submitButton.disabled = true;
    submitButton.textContent = "Creating Trainer...";


    try {

        // -------------------------------------------------
        // CREATE FIREBASE AUTHENTICATION ACCOUNT
        // -------------------------------------------------

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;


        // -------------------------------------------------
        // SAVE TRAINER TO REALTIME DATABASE
        // -------------------------------------------------

        await set(
            ref(db, `users/${user.uid}`),
            {
                uid: user.uid,
                username: username,
                email: email,
                homeRegion: homeRegion,
                currentRegion: "kanto",
                characterCreated: false,
                createdAt: Date.now()
            }
        );


        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        showSuccess(
            "Trainer account created successfully!"
        );

        console.log(
            "Trainer created successfully:",
            user.uid
        );


        // Later we can redirect here:
        //
        // window.location.href = "character-creator.html";

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

    button.addEventListener("click", () => {

        const targetId =
            button.dataset.passwordToggle;

        const input =
            document.getElementById(targetId);

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
    });
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

        case "auth/missing-password":
            return "Please enter a password.";

        case "auth/network-request-failed":
            return "We couldn't connect to Firebase. Please try again.";

        default:
            return "Something went wrong while creating your Trainer account.";
    }
}
