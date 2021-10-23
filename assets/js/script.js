// Global variables
var hiScoreBtn = document.querySelector(".high-score-button");
var timeEl = document.querySelector(".clock");
var containerDivEl = document.querySelector(".container");
var splashTextEl = document.querySelector(".default");
var startBtn = document.querySelector(".start-button");
var questionSectionEl;

var timeLeft = 90;
var gameInProgress = false;

// Question objects
var question1 = {
    question: "What is a method?",
    correctAnswer: "A function which is a property of an objet",
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

// Array of questions
var questionArray = [question1, question2, question3]
var askedQuestions = [];


// Maybe these can be stored locally?
var score = 0;

// Generates random number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Removes a new question from the questionArray, adds it to the askedQuestions array then returns it
function getRandomQuestion() {
    var newQuestion = questionArray.pop();
    askedQuestions.push(newQuestion);
    return newQuestion;
}

// Runs when Start button is pressed
function startGame() {
    splashTextEl.setAttribute("class", "default hidden");
    hiScoreBtn.setAttribute("class", ".high-score-button hidden")
    gameInProgress = true;
    // countdown();
    populateQuestion();

}

function checkAnswer(event) {
    event.preventDefault();
    var chosenAnswer = event.target;

    // Checks to see if chosen answer was correct
    if (chosenAnswer.className.includes("correct")) {
        score++;
        while (questionSectionEl.children.length !== 0) {
            questionSectionEl.removeChild(questionSectionEl.lastElementChild);
        }
        questionSectionEl.remove();

        if (questionArray.length > 0) {
            populateQuestion();
        }
    } else {
        timeLeft = timeLeft - 10;
    }
}

// Restores welcome screen
function welcomeScreen() {
    splashTextEl.setAttribute("class", "default");
}

// Makes new HTML elements based on a retrieved question object from questionArray
function populateQuestion() {

    // New HTML elements
    questionSectionEl = document.createElement("section");
    var questionEl = document.createElement("h1")
    var answerListEl = document.createElement("ul")

    // Appending new elements to page
    containerDivEl.append(questionSectionEl);
    questionSectionEl.append(questionEl);
    questionSectionEl.append(answerListEl);

    var nextQuestion = getRandomQuestion();
    var propertyNames = Object.getOwnPropertyNames(nextQuestion);
    var qstnsAndAnswrs = Object.values(nextQuestion);
    for (var i = 0; i < propertyNames.length; i++) {
        if (i === 0) {
            questionEl.textContent = qstnsAndAnswrs[i];
            questionEl.setAttribute("class", propertyNames[i]);
        } else {
            var newDiv = document.createElement("button")
            newDiv.setAttribute("class", propertyNames[i] + " answer");
            newDiv.textContent = qstnsAndAnswrs[i];
            answerListEl.append(newDiv);
            newDiv.addEventListener("click", (checkAnswer))
        }
    }
}

function countdown() {
    timeLeft = 90;

    var timeInterval = setInterval(function () {
        timeEl.textContent = timeLeft;
        timeLeft--;

        if (timeLeft >= 0)
            clearInterval(timeInterval);

    }, 1000);
}


// Event listeners
startBtn.addEventListener("click", startGame);



