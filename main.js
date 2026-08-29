// =========================================================
// PKMN VOYAGE
// Main JavaScript
// =========================================================


// ---------------------------------------------------------
// 1. DOM READY
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    console.log("PKMN Voyage loaded successfully.");

    initializeNavigation();
    initializeSmoothScroll();
});


// ---------------------------------------------------------
// 2. NAVIGATION
// ---------------------------------------------------------

function initializeNavigation() {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            console.log(`Navigating to: ${link.getAttribute("href")}`);
        });
    });
}


// ---------------------------------------------------------
// 3. SMOOTH SCROLL
// ---------------------------------------------------------

function initializeSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}


// ---------------------------------------------------------
// 4. UTILITY FUNCTIONS
// ---------------------------------------------------------

function showElement(element) {
    if (!element) return;

    element.classList.remove("hidden");
}


function hideElement(element) {
    if (!element) return;

    element.classList.add("hidden");
}


function toggleElement(element) {
    if (!element) return;

    element.classList.toggle("hidden");
}


// ---------------------------------------------------------
// 5. FUTURE GAME INITIALIZATION
// ---------------------------------------------------------

function initializeGameSystems() {
    /*
        Future systems can be initialized here.

        Examples:

        - Firebase authentication
        - Current trainer session
        - Player profile
        - Character creator
        - Region progression
        - Notifications
        - Multiplayer presence
        - Game settings

        Do not place trusted game logic directly in the browser.
    */
}
