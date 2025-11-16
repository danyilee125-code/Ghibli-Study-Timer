let time = 30 * 60; // 30:00 in Sekunden
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");

// Timer-Funktion
function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = "Start";
        }
    }, 1000);
}

// Start/Pause
startBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTimer();
        startBtn.textContent = "Pause";
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startBtn.textContent = "Start";
        isRunning = false;
    }
});

// Restart
restartBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    time = 30 * 60;
    updateDisplay();
    startBtn.textContent = "Start";
    isRunning = false;
});

// Initiale Anzeige
updateDisplay();


// ==========================
// Musik-Player
// ==========================
const musicPlay = document.querySelector(".music-play"); // nur ein Button
const musicOptions = document.getElementById("musicOptions");
const bgAudio = document.getElementById("bgAudio");

let isPlaying = false;

// Klick auf Musik-Button -> Play/Pause oder Menü
musicPlay.addEventListener("click", () => {
    if (!isPlaying) {
        // Musik läuft nicht -> Menü ein-/ausblenden
        musicOptions.style.display = musicOptions.style.display === "flex" ? "none" : "flex";
    } else {
        // Musik läuft -> Pause
        bgAudio.pause();
        isPlaying = false;
        musicPlay.innerHTML = '<i class="iconoir-music-double-note"></i>';
    }
});

// Track auswählen -> Musik abspielen + Icon ändern
document.querySelectorAll(".track").forEach(track => {
    track.addEventListener("click", () => {
        const src = track.getAttribute("data-src");
        bgAudio.src = src;
        bgAudio.play();
        isPlaying = true;
        musicOptions.style.display = "none";
        musicPlay.innerHTML = '<i class="iconoir-pause"></i>';
    });
});

// Musik endet -> Icon zurücksetzen
bgAudio.addEventListener("ended", () => {
    isPlaying = false;
    musicPlay.innerHTML = '<i class="iconoir-music-double-note"></i>';
});
