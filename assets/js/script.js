// Global variables
var highscoreBtn = document.querySelector(".high-score-button");
var timeEl = document.querySelector("span");
var containerDivEl = document.querySelector(".container");
var splashTextEl = document.querySelector(".default");
var startBtn = document.querySelector(".start-button");

var timeLeft;
var gameInProgress = false;
var score = 0;

var correctAnswer = "";

// Array of question objects
var questionArray = [
    {
        question: "The className property of the Element interface gets and sets the value of the _____ attribute of the specified element.",
        correctAnswer: "Class",
        falseAnswer1: "Style",
        falseAnswer2: "ID",
        falseAnswer3: "Type"
    },
    {
        question: "What is a method?",
        correctAnswer: "A function which is a property of an object",
        falseAnswer1: "Did you say meth head?",
        falseAnswer2: "An object which is a function of a property",
        falseAnswer3: "A property which is an object of a function"
    },
    {
        question: "What is a function?",
        correctAnswer: "A snippet that can be called by other code or by itself or by a variable that refers to the function",
        falseAnswer1: "Conjunction junction, what's your function?",
        falseAnswer2: "A snippet that cannot be called by other code or by itself",
        falseAnswer3: "Something terrible"
    },
    {
        question: "What is an argument?",
        correctAnswer: "An argument is a value passed as input into a function",
        falseAnswer1: "Nothing much, what's an argument-a you?",
        falseAnswer2: "Nothing",
        falseAnswer3: "Don't click this"
    },
    {
        question: "You can use CSS to style an HTML page",
        correctAnswer: "True",
        falseAnswer1: "False",
    },
    {
        question: "Who gets Flexbox properties when a Flexbox is declared?",
        correctAnswer: "The declared container and its children",
        falseAnswer1: "Flex who?",
        falseAnswer2: "The declared container",
        falseAnswer3: "The declared container's children"
    }
]

// Empty array to store previously asked questions
var askedQuestions = [];

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
        var questionSectionEl = document.createElement("section");
        var questionEl = document.createElement("h1")
        var answerListEl = document.createElement("ul")

        // Appending new elements to page, setting class attributes for CSS
        containerDivEl.append(questionSectionEl);
        questionSectionEl.append(questionEl);
        questionSectionEl.append(answerListEl);
        questionSectionEl.className = "question-section";

        // Retrieves random question from questionArray and its property names and values are stored
        var nextQuestion = getRandomQuestion();
        var propertyNames = Object.getOwnPropertyNames(nextQuestion);
        var qstnsAndAnswrs = Object.values(nextQuestion);

        // Creates answer buttons based on number of available answers in chosen object
        for (var i = 0; i < propertyNames.length; i++) {

            // Makes question 
            if (i === 0) {
                questionEl.textContent = qstnsAndAnswrs[i];
                questionEl.setAttribute("class", propertyNames[i]);
            } else {
                var newDiv = document.createElement("button")
                newDiv.setAttribute("class", "answer");
                newDiv.textContent = qstnsAndAnswrs[i];

                // Randomly sorts answer buttons
                if (getRandomInt(2) % 2) {
                    answerListEl.append(newDiv);
                } else {
                    answerListEl.prepend(newDiv);
                }
                newDiv.addEventListener("click", checkAnswer)
            }
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
    // Saves correct answer as variable
    correctAnswer = newQuestion.correctAnswer;
    return newQuestion;
}

// Answer buttons contain an eventListener with this function
// Checks to see if correct answer was chosen
// If so, question is removed and new question populates
// If not, time is deducted
function checkAnswer(event) {
    var chosenAnswer = event.target;

    // Checks to see if chosen answer was correct
    if (chosenAnswer.textContent === correctAnswer) {
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
    for (var i = 1; containerDivEl.children.length > i; i) {
        containerDivEl.children[i].remove();
    }
}

// Restores page to splash
function resetGame() {
    splashTextEl.setAttribute("class", "default");
    containerDivEl.setAttribute("class", "container")
    highscoreBtn.setAttribute("class", ".high-score-button")
    removeLastElements();
    score = 0;
    timeLeft = 0;
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
    endgameMessageEl.textContent = "Your final score is: " + score + "\nYou had " + timeLeft + " seconds on the clock.";
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

        // Checks to see if input field is empty
        if (initialInputEl.value.trim() !== "") {
            var newHighscoreEntry = [{
                highscore: score,
                time: timeLeft,
                initials: initialInputEl.value.trim()
            }]

            if (localStorage.getItem("highscores") === null) {
                localStorage.setItem("highscores", JSON.stringify(newHighscoreEntry));
            } else {
                var storedHighscores = retrieveScores();

                var highscoreArray = storedHighscores.concat(newHighscoreEntry);

                // Sorts highscores from highest to lowest score and then from most to least remaining time
                highscoreArray.sort(function (a, b) {
                    if (a.highscore > b.highscore) return -1;
                    if (a.highscore < b.highscore) return 1;
                    if (a.time > b.time) return -1;
                    if (a.time < b.time) return 1;
                }
                );
                while(highscoreArray.length > 10) highscoreArray.pop();
                localStorage.setItem("highscores", JSON.stringify(highscoreArray));
            }
            // resetGame();
            populateHighscore();
        } else {
            alert("Please enter your initials");
        }
    });
}

function retrieveScores() {
    return JSON.parse(localStorage.getItem("highscores"));
}

function populateHighscore() {
    splashTextEl.setAttribute("class", "default hidden");
    highscoreBtn.setAttribute("class", ".high-score-button hidden")
    containerDivEl.setAttribute("class", "container highscores")
    removeLastElements();

    // Makes highscore HTML elements
    var highscoreFieldEl = document.createElement("content");
    var highscoreTitleEl = document.createElement("h1");
    var highscoreListEl = document.createElement("ol");
    var clearHighscoreBtn = document.createElement("button");
    var returnHomeBtn = document.createElement("button");

    // Text content and class attributes
    highscoreTitleEl.textContent = "Highscores";
    clearHighscoreBtn.textContent = "Clear highscores";
    returnHomeBtn.textContent = "Return home";

    // Appending to HTML
    containerDivEl.append(highscoreFieldEl);
    highscoreFieldEl.append(highscoreTitleEl);
    highscoreFieldEl.append(highscoreListEl);
    highscoreFieldEl.append(returnHomeBtn);
    highscoreFieldEl.append(clearHighscoreBtn);

    var highscoreArray = retrieveScores();
    if (highscoreArray !== null) {
        for (var i = 0; highscoreArray.length > i; i++) {
            var newLiEl = document.createElement("li");
            var retrievedStats = highscoreArray[i];

            // Ordered list automatic numbering wasn't working so I manually added rankings to beginning of string
            newLiEl.textContent = i + 1 + ". " + retrievedStats.initials + " - " + retrievedStats.highscore + " with " + retrievedStats.time + " seconds left";
            highscoreListEl.append(newLiEl);
        }
    }
    // Adds eventListener to Return Home button
    returnHomeBtn.addEventListener("click", function (event) {
        event.preventDefault();
        resetGame();
    })
    // Adds eventListener to Clear Highscore button
    clearHighscoreBtn.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        populateHighscore();
    })
}

// Event listeners
startBtn.addEventListener("click", startGame);
highscoreBtn.addEventListener("click", populateHighscore);

resetGame();