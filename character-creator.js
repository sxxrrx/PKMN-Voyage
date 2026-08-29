import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    ref,
    get,
    update
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

import {
    auth,
    db
} from "./firebase-config.js";


// =========================================================
// PKMN VOYAGE
// CHARACTER CREATOR
// =========================================================

const trainerNameDisplay =
    document.getElementById(
        "trainer-name-display"
    );

const homeRegionDisplay =
    document.getElementById(
        "home-region-display"
    );

const logoutButton =
    document.getElementById(
        "logout-button"
    );

const continueButton =
    document.getElementById(
        "continue-button"
    );


let currentUser = null;
let currentTrainer = null;


// =========================================================
// AUTH STATE
// =========================================================

onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            window.location.href =
                "login.html";

            return;

        }


        currentUser = user;


        try {

            const trainerRef =
                ref(
                    db,
                    `users/${user.uid}`
                );


            const snapshot =
                await get(trainerRef);


            if (!snapshot.exists()) {

                console.error(
                    "Trainer record not found."
                );

                trainerNameDisplay.textContent =
                    "Trainer Not Found";

                homeRegionDisplay.textContent =
                    "Unknown";

                return;

            }


            currentTrainer =
                snapshot.val();


            trainerNameDisplay.textContent =
                currentTrainer.username
                || "Trainer";


            homeRegionDisplay.textContent =
                formatRegionName(
                    currentTrainer.homeRegion
                );

        }
        catch (error) {

            console.error(
                "Failed to load Trainer:",
                error
            );


            trainerNameDisplay.textContent =
                "Unable to Load Trainer";

            homeRegionDisplay.textContent =
                "Unknown";

        }

    }
);


// =========================================================
// CONTINUE
// =========================================================

continueButton.addEventListener(
    "click",
    async () => {

        if (!currentUser) {
            return;
        }


        continueButton.disabled = true;

        continueButton.textContent =
            "Preparing Journey...";


        try {

            await update(
                ref(
                    db,
                    `users/${currentUser.uid}`
                ),
                {
                    characterCreated: true
                }
            );


            /*
                Eventually this should send
                the player into the actual
                Kanto opening sequence.

                For now we'll send them
                to game.html.
            */

            window.location.href =
                "game.html";

        }
        catch (error) {

            console.error(
                "Unable to continue:",
                error
            );


            continueButton.disabled = false;

            continueButton.textContent =
                "Continue";

        }

    }
);


// =========================================================
// LOG OUT
// =========================================================

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            await signOut(auth);

            window.location.href =
                "login.html";

        }
        catch (error) {

            console.error(
                "Logout failed:",
                error
            );

        }

    }
);


// =========================================================
// HELPERS
// =========================================================

function formatRegionName(region) {

    if (!region) {
        return "Unknown";
    }


    return (
        region.charAt(0).toUpperCase()
        + region.slice(1)
    );

}
