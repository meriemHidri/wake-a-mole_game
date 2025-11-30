const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('timeLeft');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const gameOverBox = document.getElementById('gameOverBox');
const finalScore = document.getElementById('finalScore');

let mole = document.createElement('div');
mole.classList.add('mole');

let score = 0;
let timeLeft = 30;
let moleTimer = null;
let countdownTimer = null;
let currentHole = null;

function getDifficulty() {
    const selected = document.querySelector('input[name="level"]:checked');
    return Number(selected.value);
}

function randomHole() {
    return holes[Math.floor(Math.random() * holes.length)];
}

function showMole(speed) {
    if (currentHole && currentHole.contains(mole)) {
        currentHole.classList.remove("active");
        currentHole.removeChild(mole);
    }

    const hole = randomHole();
    hole.appendChild(mole);
    currentHole = hole;
    hole.classList.add("active");

    mole.classList.add("up");

    setTimeout(() => {
        mole.classList.remove("up");
        hole.classList.remove("active");
    }, speed * 0.8);
}

function startGame() {
    clearInterval(moleTimer);
    clearInterval(countdownTimer);

    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    gameOverBox.classList.add("hide");

    startBtn.disabled = true;
    stopBtn.disabled = false;
    document.querySelectorAll('input[name="level"]').forEach(r => r.disabled = true);

    const speed = getDifficulty();

    moleTimer = setInterval(() => showMole(speed), speed);

    countdownTimer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) endGame();

    }, 1000);
}

function endGame() {
    clearInterval(moleTimer);
    clearInterval(countdownTimer);

    if (currentHole && currentHole.contains(mole)) {
        currentHole.removeChild(mole);
        currentHole.classList.remove("active");
    }

    startBtn.disabled = false;
    stopBtn.disabled = true;
    document.querySelectorAll('input[name="level"]').forEach(r => r.disabled = false);

    finalScore.textContent = "Your score: " + score;
    gameOverBox.classList.remove("hide");
}

mole.addEventListener("click", () => {
    if (!mole.classList.contains("up")) return;

    mole.classList.add("hit");
    setTimeout(() => mole.classList.remove("hit"), 150);

    score++;
    scoreDisplay.textContent = score;
    scoreDisplay.style.transform = "scale(1.3)";
    setTimeout(() => scoreDisplay.style.transform = "scale(1)", 150);
});

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", endGame);
