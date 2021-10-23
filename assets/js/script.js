// Global variables
var highscoreBtn = document.querySelector(".high-score-button");
var timeEl = document.querySelector("span");
var containerDivEl = document.querySelector(".container");
var splashTextEl = document.querySelector(".default");
var startBtn = document.querySelector(".start-button");
var questionSectionEl;

var timeLeft;
var gameInProgress = false;

// Question objects

// Template for new questions
// var questionX = {
//     question: "What is a question?",
//     correctAnswer: "True",
//     falseAnswer1: "False",
//     falseAnswer2: "False",
//     falseAnswer3: "False"
// }

var question0 = {
    question: "The className property of the Element interface gets and sets the value of the _____ attribute of the specified element.",
    correctAnswer: "Class",
    falseAnswer1: "Style",
    falseAnswer2: "ID",
    falseAnswer3: "Type"
}
var question1 = {
    question: "What is a method?",
    correctAnswer: "A function which is a property of an object",
    falseAnswer1: "Did you say meth head?",
    falseAnswer2: "An object which is a function of a property",
    falseAnswer3: "A property which is an object of a function"
}
var question2 = {
    question: "What is a function?",
    correctAnswer: "A snippet that can be called by other code or by itself or by a variable that refers to the function",
    falseAnswer1: "Conjunction junction, what's your function?",
    falseAnswer2: "A snippet that cannot be called by other code or by itself",
    falseAnswer3: "Something terrible"
}
var question3 = {
    question: "What is an argument?",
    correctAnswer: "An argument is a value passed as input into a function",
    falseAnswer1: "Nothing much, what's an argument-a you?",
    falseAnswer2: "Nothing",
    falseAnswer3: "Don't click this"
}
var question4 = {
    question: "You can use CSS to style an HTML page",
    correctAnswer: "True",
    falseAnswer1: "False",
}


// Array of questions
var questionArray = [question0, question1, question2, question3, question4];

// Tried making a loop to push each question into the array, didn't work. Will work on it later.
// for(var i = 1; questioni !== undefined ; i++){
//     questionArray.push(questioni);
// }

// Empty array to store previously asked questions
var askedQuestions = [];


// Maybe these can be stored locally?
var score = 0;

function init() {
    resetGame();

}

// Runs when Start button is pressed
function startGame() {
    splashTextEl.setAttribute("class", "default hidden");
    highscoreBtn.setAttribute("class", ".high-score-button hidden")
    gameInProgress = true;
    countdown();
    populateQuestion();
}

// Starts countdown clock
function countdown() {
    timeLeft = 90;
    setTime();

    var timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            setTime();
        }
        if (timeLeft === 0 || timeLeft < 0 || !gameInProgress) {
            clearInterval(timeInterval);
            endgame();
        }
    }, 1000);
}

// Assigns timeLeft to HTML element
function setTime() {
    timeEl.textContent = timeLeft;
}

// Makes new HTML elements based on a retrieved question object from questionArray
function populateQuestion() {

    // If the questionArray has any questions left, a new question is retrieved and populates the screen
    if (questionArray.length > 0) {

        // New HTML elements
        questionSectionEl = document.createElement("section");
        var questionEl = document.createElement("h1")
        var answerListEl = document.createElement("ul")

        // Appending new elements to page, setting class attributes for CSS
        containerDivEl.append(questionSectionEl);
        questionSectionEl.append(questionEl);
        questionSectionEl.append(answerListEl);
        questionSectionEl.className = "question-section";

        // Retrieves random question from questionArray
        var nextQuestion = getRandomQuestion();
        var propertyNames = Object.getOwnPropertyNames(nextQuestion);
        var qstnsAndAnswrs = Object.values(nextQuestion);
        questionEl.textContent = qstnsAndAnswrs[0];
        questionEl.setAttribute("class", propertyNames[0]);

        // Creates answer buttons based on number of available answers in chosen object
        for (var i = 1; i < propertyNames.length; i++) {
            var newDiv = document.createElement("button")
            newDiv.setAttribute("class", propertyNames[i] + " answer");
            newDiv.textContent = qstnsAndAnswrs[i];

            // Randomly sorts answer buttons
            if (getRandomInt(2) % 2) {
                answerListEl.append(newDiv);
            } else {
                answerListEl.prepend(newDiv);
            }
            newDiv.addEventListener("click", checkAnswer)
        }

        // If no questions remain, gameInProgress becomes false and timeInterval is cleared when it checks again
    } else {
        gameInProgress = false;
    }
}

// Generates random number, used to retrieve a random question
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Returns a random question from the questionArray
function getRandomQuestion() {
    // Removes random question from questionArray, indexed at 0 in returned array
    var newQuestion = questionArray.splice(getRandomInt(questionArray.length), 1)[0];
    // Adds question to askedQuestions array
    askedQuestions.push(newQuestion);
    return newQuestion;
}

// Answer buttons contain an eventListener with this function
// Checks to see if correct answer was chosen
// If so, question is removed and new question populates
// If not, time is deducted
function checkAnswer(event) {
    // event.preventDefault();
    var chosenAnswer = event.target;

    // Checks to see if chosen answer was correct
    if (chosenAnswer.className.includes("correct")) {
        score++;
        removeLastElements();
        populateQuestion();
    } else {
        timeLeft = timeLeft - 10;

        // If timeLeft becomes less than 0, timeLeft is set to 0
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        setTime();
    }
}

// Removes all elements from container div except for splash text
function removeLastElements() {
    var lastElement = containerDivEl.lastElementChild
    if (containerDivEl.children.length > 1) {
        while (lastElement.children.length !== 0) {
            lastElement.removeChild(lastElement.lastElementChild);
        }
        lastElement.remove();
    }
}

// Restores page to default functionality
function resetGame() {
    splashTextEl.setAttribute("class", "default");
    highscoreBtn.setAttribute("class", ".high-score-button")
    removeLastElements();
    timeLeft = 0;
    score = 0;
    setTime();
    questionArray = questionArray.concat(askedQuestions);
    askedQuestions = [];
    gameInProgress = false;
}

// Creates HTML elements showing final score and input field for initials to be saved to local storage
function endgame() {
    removeLastElements();
    var endgameContentEl = document.createElement("section");
    endgameContentEl.setAttribute("class", "endgame");

    var endgameTitleEl = document.createElement("h1");
    endgameTitleEl.textContent = "All done!"
    var endgameMessageEl = document.createElement("p");
    endgameMessageEl.textContent = "Your final score is: " + score;
    var initialInputEl = document.createElement("input");
    initialInputEl.setAttribute("placeholder", "Enter Your Intials Here");
    var initialSubmitBtn = document.createElement("button")
    initialSubmitBtn.textContent = "Submit"

    containerDivEl.append(endgameContentEl);
    endgameContentEl.append(endgameTitleEl);
    endgameContentEl.append(endgameMessageEl);
    endgameContentEl.append(initialInputEl);
    endgameContentEl.append(initialSubmitBtn);

    initialSubmitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (initialInputEl.value !== "") {
            var newHighscoreEntry = [{
                highscore: score,
                intials: initialInputEl.value.trim()
            }]

            if (localStorage.getItem("highscores") === null) {
                localStorage.setItem("highscores", JSON.stringify(newHighscoreEntry));
            } else {
                var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
                console.log(storedHighscores);

                highscoreArray = storedHighscores.concat(newHighscoreEntry);
                console.log(highscoreArray);
                localStorage.setItem("highscores", JSON.stringify(highscoreArray));
            }
            resetGame();
            // populateHighscore();
        } else {
            alert("Please enter your initials");
        }
    });
}

function submitHighscore(event) {
    event.preventDefault();




    resetGame();
}

function populateHighscore() {

}

// Event listeners
startBtn.addEventListener("click", startGame);
highscoreBtn.addEventListener("click", populateHighscore());

init();

