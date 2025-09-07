// ------------------ Select Elements ------------------
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const modes = document.querySelectorAll("#modes button");
const countdownEl = document.getElementById("countdown");
const countEl = document.getElementById("count");
const themeToggle = document.getElementById("theme-toggle");
const messageEl = document.getElementById("message");

let timer;
let quoteTimer;
let totalTime = 25 * 60; // default work session
let timeLeft = totalTime;
let isRunning = false;
let cycles = 0;
let currentMode = "work"; // work, short, long

// ------------------ Motivational Quotes ------------------
const quotes = [
    "🌟 Stay focused, your future self will thank you!",
    "💪 You’re stronger than your distractions.",
    "🚀 Small steps each day lead to big results.",
    "🔥 Push yourself, because no one else will.",
    "🌸 Progress, not perfection.",
    "📈 Every Pomodoro is an investment in yourself.",
    "🏆 Discipline beats motivation."
];

// ------------------ Sounds ------------------
const clickSound = new Audio("sound/414719__devern__mouse-click.wav");
const resetSound = new Audio("sound/414719__devern__mouse-click.wav");
const dingSound = new Audio("sound/414719__devern__mouse-click.wav");

// ------------------ Functions ------------------
function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    minutesEl.textContent = mins.toString().padStart(2, "0");
    secondsEl.textContent = secs.toString().padStart(2, "0");
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    clickSound.play(); // 🔊 play on start

    // Starting messages
    if (currentMode === "work") {
        messageEl.textContent = "🍅 Focus time started! Stay sharp!";
    } else if (currentMode === "short") {
        messageEl.textContent = "☕ Short break started! Relax a bit.";
    } else if (currentMode === "long") {
        messageEl.textContent = "🌴 Long break started! Recharge yourself.";
    }

    // Show quotes every 60s (work mode only)
    quoteTimer = setInterval(() => {
        if (isRunning && currentMode === "work") {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            messageEl.textContent = randomQuote;
        }
    }, 60000);

    // Main countdown
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            clearInterval(quoteTimer);
            isRunning = false;

            if (currentMode === "work") {
                cycles++;
                countEl.textContent = cycles;
                messageEl.textContent = "✅ Work session complete! Take a break!";
            } else {
                messageEl.textContent = "✨ Break over! Time to get back to work!";
            }

            dingSound.play(); // 🔊 sound when time is up
            alert("⏰ Time’s up!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    clearInterval(quoteTimer);
    isRunning = false;
    clickSound.play();
    messageEl.textContent = "⏸️ Timer paused.";
}

function resetTimer() {
    clearInterval(timer);
    clearInterval(quoteTimer);
    isRunning = false;
    timeLeft = totalTime;
    updateDisplay();
    resetSound.play(); // 🔊 play on reset
    messageEl.textContent = "🔄 Timer reset. Ready when you are!";
}

// ------------------ Mode Switching ------------------
modes.forEach((btn) => {
    btn.addEventListener("click", () => {
        currentMode = btn.dataset.mode;

        if (currentMode === "work") totalTime = 25 * 60;
        if (currentMode === "short") totalTime = 5 * 60;
        if (currentMode === "long") totalTime = 15 * 60;

        timeLeft = totalTime;
        resetTimer();

        if (currentMode === "work") {
            messageEl.textContent = "📝 Ready to focus?";
        } else if (currentMode === "short") {
            messageEl.textContent = "☕ Short break time!";
        } else {
            messageEl.textContent = "🌴 Take a long break!";
        }
    });
});

// ------------------ Theme Toggle ------------------
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.innerHTML = document.body.classList.contains("dark")
        ? '<i class="ri-moon-fill"></i>'
        : '<i class="ri-sun-fill"></i>';
    clickSound.play(); // 🔊 play on theme toggle
});

// ------------------ Button Events ------------------
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// ------------------ Init ------------------
updateDisplay();
messageEl.textContent = "Ready to start your session?";
