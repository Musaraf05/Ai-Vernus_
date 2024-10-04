let score = 0;
document.addEventListener("DOMContentLoaded", () => {
    const WORDS = [
        { word: "API", description: "Application Programming Interface for communication between software." },
        { word: "APP", description: "A software application designed for user tasks on devices." },
        { word: "DATABASE", description: "An organized collection of data stored and accessed electronically." },
        { word: "BROWSER", description: "A software application for accessing and navigating the web." },
        { word: "SERVER", description: "A system that provides data or services to other computers over a network." },
        { word: "NETWORK", description: "A group of interconnected computers that share resources." },
        { word: "SCRIPT", description: "A set of instructions written in a programming language for automation." },
        { word: "HARDWARE", description: "The physical components of a computer system." },
        { word: "FIREWALL", description: "A network security system that monitors and controls incoming traffic." },
        { word: "ENCRYPT", description: "The process of converting information into a secure format." },
        { word: "TOKEN", description: "A piece of data used for authentication in security protocols." },
        { word: "CONSOLE", description: "A text-based interface for user interaction with a computer." },
        { word: "DOMAIN", description: "An identification string that defines a realm of administrative autonomy." },
        { word: "PROTOCOL", description: "A set of rules governing the exchange of data over a network." },
        { word: "ARCHIVE", description: "A collection of historical records or data stored for long-term use." },
        { word: "LOGGING", description: "The process of recording events, errors, or messages for monitoring." },
        { word: "UPLOAD", description: "The process of transferring files from a local computer to a remote server." },
        { word: "REPOSITORY", description: "A centralized storage location for software packages or files." },
        { word: "VERSION", description: "A specific form or variant of a document or software product." },
        { word: "REFRESH", description: "The process of reloading content or data to reflect current changes." },
        { word: "GITHUB", description: "A platform for version control and collaboration using Git." },
        { word: "SECURITY", description: "Measures taken to protect a computer or network from unauthorized access." },
        { word: "VIRTUAL", description: "Simulated or computer-generated representations of physical systems." },
        { word: "OUTPUT", description: "The information produced by a computer or software program." },
        { word: "ANALYTICS", description: "The systematic analysis of data or statistics." },
        { word: "HYPERTEXT", description: "Text displayed on a computer that contains links to other texts." },
        { word: "COMPILER", description: "A program that converts code written in a high-level language to machine code." },
        { word: "DEBUGGER", description: "A tool used to test and debug programs." },
        { word: "KEYBOARD", description: "An input device used to enter text and commands into a computer." },
        { word: "BACKEND", description: "The server-side of an application that handles data processing." },
        { word: "FRONTEND", description: "The user interface and client-side of a web application." },
        { word: "AGILE", description: "A project management methodology focused on iterative development." },
        { word: "JAVASCRIPT", description: "A programming language commonly used in web development." },
        { word: "REBOOT", description: "The process of restarting a computer or device." },
        { word: "SWITCH", description: "A device that connects multiple devices on a network." },
        { word: "HACKING", description: "The act of exploiting weaknesses in computer systems or networks." },
        { word: "PATCH", description: "A piece of software designed to update or fix existing software." },
        { word: "ISOLATE", description: "To separate a system or component from others for security." },
        { word: "SCRIPTING", description: "The process of writing scripts to automate tasks." },
        { word: "STORAGE", description: "The component of a computer system where data is saved." },
        { word: "INPUT", description: "Data that is entered into a computer or system for processing." },
        { word: "DISK", description: "A flat, circular device that stores data in a computer." },
        { word: "PARSE", description: "To analyze a string of symbols, either in natural or computer languages." },
        { word: "RUNTIME", description: "The period during which a program is running." },
        { word: "FOLDER", description: "A virtual container within a digital file system." },
        { word: "DEVICE", description: "An electronic component or hardware designed for a specific function." },
        { word: "BATCH", description: "A set of data processed in a single batch for efficiency." }

    ];

    const TOTAL_TIME = 90; // Total game time in seconds
    const TOTAL_ROUNDS = 1; // Total number of rounds


    let currentRound = 0; // Counter for the rounds
    let wordObj = {};
    let previousWord = {};
    let revealedIndices = new Set();
    
    let secondsLeft = TOTAL_TIME;
    let countdownInterval;
    let guessStartTime;

    const letterBoxes = document.getElementById('word-container');
    const progressBar = document.getElementById('progress-bar');
    const userInput = document.getElementById('user-input');
    const submitButton = document.getElementById('submit-answer');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const hintButton = document.getElementById('hint-button');

    function getRandomWord() {
        let newWord;
        do {
            newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        } while (newWord.word === previousWord.word && WORDS.length > 1);
        previousWord = newWord;
        return newWord;
    }

    function createLetterBoxes() {
        letterBoxes.innerHTML = '';
        for (let i = 0; i < wordObj.word.length; i++) {
            const box = document.createElement('div');
            box.className = 'letter-box';
            box.textContent = '_';
            letterBoxes.appendChild(box);
        }
    }

    function getRandomIndex() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * wordObj.word.length);
        } while (revealedIndices.has(randomIndex));
        return randomIndex;
    }

    function revealLetter() {
        if (revealedIndices.size < wordObj.word.length) {
            const randomIndex = getRandomIndex();
            revealedIndices.add(randomIndex);
            const letterBox = letterBoxes.children[randomIndex];
            letterBox.textContent = wordObj.word[randomIndex];
            letterBox.style.color = "#1d1a39";
            letterBox.classList.add('reveal-animation');

            const progressPercentage = (revealedIndices.size / wordObj.word.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function resetGame() {
        if (currentRound < TOTAL_ROUNDS) { // Check if rounds are remaining
            wordObj = getRandomWord();
            revealedIndices.clear();
            createLetterBoxes();
            secondsLeft = TOTAL_TIME;
            progressBar.style.width = '0%';
            timerDisplay.textContent = "Time: 01:30";
            userInput.value = '';
            submitButton.disabled = false;
            hintButton.style.display = 'none'; // Hide the hint button initially

            clearInterval(countdownInterval);
            countdownInterval = setInterval(updateTimer, 1000);

            // Reveal the first letter immediately
            revealLetter();

            guessStartTime = Date.now(); // Start the timer for guessing
            currentRound++; // Increment the round counter
        } else {
            document.getElementById('game-screen').style.display = 'none'; // Hide the game screen
            document.getElementById('end-screen').style.display = 'block';
        }
    }

    function updateTimer() {
        secondsLeft--;
        timerDisplay.textContent = `Time: ${formatTime(secondsLeft)}`;

        // Calculate the percentage of time left
        const progressPercentage = (secondsLeft / TOTAL_TIME) * 100;

        // Create a smooth gradient from green (start) to orange (middle) to red (end)
        const gradientColor = `linear-gradient(to top, #b14cf0 ${progressPercentage}%, #fff ${(progressPercentage * 2) / 3}%, #fff ${(100 - progressPercentage)}%)`;
        timerDisplay.style.background = gradientColor;

        // Reveal a letter every 30 seconds starting from 60 seconds
        if (secondsLeft % 30 === 0 && secondsLeft < TOTAL_TIME && secondsLeft > 0) {
            revealLetter();  // Reveal a letter every 30 seconds
        }

        // Show hint button after 45 seconds
        if (secondsLeft === 89) {
            hintButton.style.display = 'block';
        }

        // When time reaches 0, prompt the user and wait for them to click "OK" before resetting the game
        if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                alert("Time's up! Time for the next question.");
                resetGame();
            }, 100);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    submitButton.addEventListener('click', () => {
        const userGuess = userInput.value.trim().toUpperCase(); // Convert user input to uppercase for comparison

        if (userGuess.length === wordObj.word.length) {
            const timeTaken = Math.round((Date.now() - guessStartTime) / 1000); // Calculate time taken
            console.log(`User's Valid Guess: ${userGuess}`);
            console.log(`Time taken to guess the word: ${timeTaken} seconds`);

            if (userGuess === wordObj.word) { // Compare directly
                score++;
                console.log(`Correct! Current Score: ${score}`);
            } else {
                console.log(`Incorrect! The correct word was "${wordObj.word}". Current Score: ${score}`);
            }
            submitButton.disabled = true;
            resetGame();
        } else {
            alert("⚠️ Please enter a guess that matches the word length.");
        }
    });

    startButton.addEventListener('click', () => {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        resetGame();
    });

    hintButton.addEventListener('click', () => {
        alert(`Hint: ${wordObj.description}`); // Provide a description of the word
    });

});

// Initialize EmailJS
(function() {
    emailjs.init("WitekVxLD6t5_PUzS"); // Replace with your EmailJS user ID
})();

// Function to send email with team details and score
function sendEmail(teamDetails, gameScore) {
    var templateParams = {
        team_name: teamDetails.team_name,
        team_member1: teamDetails.team_member1,
        team_member2: teamDetails.team_member2,
        team_member3: teamDetails.team_member3,
        score: gameScore
    };

    emailjs.send('service_pzho5rs', 'template_nr2v0pr', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

// Function to handle end of the game
function handleEndGame() {
    // Retrieve team details from local storage
    var teamDetails = JSON.parse(localStorage.getItem('teamDetails'));
    var gameScore = calculateGameScore(); // Replace this with your actual score calculation method

    // Send email with team details and game score
    sendEmail(teamDetails, gameScore);
}

// Function to calculate game score (for demonstration, using a random score)
function calculateGameScore() {
    return score;
}

// Event listener for window load
window.onload = function() {
    // Set up the event listener for when the game ends
    var endScreen = document.getElementById("end-screen");
    if (endScreen.style.display === "block") {
        handleEndGame();
    }

    // Event listener for the start button
    var startButton = document.getElementById("start-button");
    startButton.addEventListener("click", function() {
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
    });
};
