const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast improves productivity and accuracy.",
    "Consistency is the key to success in coding.",
    "Despite everything, it's still you.",
    "I used to be an adventurer like you, then I took an arrow in the knee.", 
    "Did I ever tell you what the definition of insanity is.",
    "Defeat is the first step to a better result.",
    "Today's a good day for some mayhem!",
    "There has never been a sadness that can't been cured by breakfast food.",
    "If i have to choose between one evil and another, then i prefer not to choose at all.",
    "A smart person knows what to say, a wise person knows whether or not to say it.",
    "be the reason someone smiles today.",
    "You can't control the direction of the wind, but you can adjust your sails.",
    "It is never too late to be who you might have been.",
    "Success is getting what you want, happiness is wanting what you get.",
    "Your life only gets better when you get better."
];

let selectedQuote = '';
let startTime;
let timer;
let timeLimit = 30; 
let timeLeft = timeLimit;
let mistakeMade = false; 
const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const startButton = document.getElementById('start-button');
const resultDisplay = document.getElementById('result');
const timerDisplay = document.createElement('div'); // Timer display element
document.querySelector('.container').appendChild(timerDisplay); // Add timer display to container


function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}


function renderQuote(inputText) {
    const quoteArray = selectedQuote.split('');
    const inputArray = inputText.split('');
    
    quoteDisplay.innerHTML = ''; 

    quoteArray.forEach((char, index) => {
        const span = document.createElement('span');
        if (inputArray[index] == null) {
            span.textContent = char; 
        } else if (inputArray[index] === char) {
            span.textContent = char; 
            span.style.color = 'black';
        } else {
            span.textContent = char; 
            span.style.backgroundColor = 'red';
            span.style.color = 'white'; // Make text white so it contrasts with the red box
            mistakeMade = true; // Mark that a mistake was made
        }
        quoteDisplay.appendChild(span);
    });
}


function startTimer() {
    timerDisplay.textContent = `Time left: ${timeLeft} seconds`; 
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            quoteInput.disabled = true; // Disable input once time runs out
            resultDisplay.textContent = `Time's up! You couldn't finish in time.`;
            startButton.textContent = "New"; 
        }
    }, 1000);
}


startButton.addEventListener('click', () => {
    selectedQuote = getRandomQuote();
    quoteInput.value = '';
    quoteInput.disabled = false;
    quoteInput.focus();
    resultDisplay.textContent = '';
    timeLeft = timeLimit; // Reset time
    startTime = new Date().getTime();
    renderQuote(''); 
    startButton.textContent = "Start Test"; 
    mistakeMade = false; 
    clearInterval(timer); 
    startTimer(); 
});


quoteInput.addEventListener('input', (e) => {
    const inputText = quoteInput.value;

    
    if (mistakeMade) {
        quoteInput.value = inputText.slice(0, -1); 
        return; 
    }

    
    renderQuote(inputText);

   
    if (inputText === selectedQuote) {
        clearInterval(timer); 
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000; 
        const wordCount = selectedQuote.split(' ').length;
        const wpm = Math.round((wordCount / timeTaken) * 60);
        resultDisplay.textContent = `Your typing speed is ${wpm} words per minute.`;
        quoteInput.disabled = true; 
        startButton.textContent = "New"; 
    }
});


quoteInput.addEventListener('keydown', (e) => {
    
    if (mistakeMade && e.key === 'Backspace') {
        mistakeMade = false; 
    }
});
