//
// REACTION TIME TESTER
//

// Interaction with other files variables
const myBody = document.body;
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const reactionSpeed = document.getElementById('reactionSpeed');

// Time variables
let timerId = null;
let randomTime;
let startTime = null;
let endTime = null;
let timeTaken = 0;
let state = null;

// Check when the start button is clicked
startButton.addEventListener('click', () => {
    start();
    startButton.disabled = true;
})

// Check when the reset button is clicked
resetButton.addEventListener('click', () => {
    reset();
})

// Check when the space bar is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.code === 'Space') {
        if (state === 'waiting') {
            clearTimeout(timerId);
            reactionSpeed.innerText = 'TOO EARLY!';
            myBody.style.background = 'yellow';
            state = 'finished';
        } else if (state === 'finished') {
            reactionSpeed.innerText = 'YOU ALREADY PRESSED!'
        } else {
            endTime = Date.now()
            calculateTime();
        }
    }
})

// Randomizes time for green background
function start() {
    state = 'waiting';
    randomTime = (Math.random() * 8000) + 2000;
    timerId = setTimeout(() => {
        myBody.style.backgroundColor = 'green';
        state = 'ready';
        startTime = Date.now()
    }, randomTime)
}

// Calculates the time taken
function calculateTime() {
    timeTaken = endTime - startTime;
    reactionSpeed.innerText = `${timeTaken.toFixed(0)}ms`;
    state = 'finished';
}

// Resets the game
function reset() {
    myBody.style.backgroundColor = 'indianred';
    clearTimeout(timerId);
    startTime = null;
    endTime = null;
    timeTaken = 0;
    state = null;
    startButton.disabled = false;
}