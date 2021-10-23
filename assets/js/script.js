// Global variables
var hiScoreBtn = document.querySelector(".high-score-button");
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
var askedQuestions = [];


// Maybe these can be stored locally?
var score = 0;

// Runs when Start button is pressed
function startGame() {
    splashTextEl.setAttribute("class", "default hidden");
    hiScoreBtn.setAttribute("class", ".high-score-button hidden")
    gameInProgress = true;
    countdown();
    populateQuestion();
}


// Assigns timeLeft to HTML element
function setTime() {
    timeEl.textContent = timeLeft;
}

// Generates random number
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

function removeQuestion() {
    while (questionSectionEl.children.length !== 0) {
        questionSectionEl.removeChild(questionSectionEl.lastElementChild);
    }
    questionSectionEl.remove();
}

function checkAnswer(event) {
    // event.preventDefault();
    var chosenAnswer = event.target;

    // Checks to see if chosen answer was correct
    if (chosenAnswer.className.includes("correct")) {
        score++;
        removeQuestion();
        populateQuestion();
    } else {
        timeLeft = timeLeft - 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        setTime();
    }
}

// Resets game to default
function resetGame() {
    splashTextEl.setAttribute("class", "default");
    removeQuestion();
    timeLeft = 0;
    setTime();
    questionArray = questionArray.concat(askedQuestions);
    askedQuestions = [];
    gameInProgress = false;
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

function countdown() {
    timeLeft = 90;
    setTime();

    var timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            setTime();
        }
        if (timeLeft === 0 || !gameInProgress) {
            clearInterval(timeInterval);
            resetGame();
        }
    }, 1000);
}


// Event listeners
startBtn.addEventListener("click", startGame);



