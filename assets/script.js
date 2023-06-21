var timerCount;
var timer;
var correctAnswer = 0;
var wrongAnswer = 0;

var timerEl = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");
var highScoreButton = document.querySelector(".high-scores")
var timesOut = document.querySelector(".time-box")
var mainEl = document.querySelector("main")
var introEl = document.querySelector(".intro")
var questionEl = document.querySelector(".question")
var optionsEl = document.querySelector(".options")
var answerEl = document.querySelectorAll(".btn")
var cardEl = document.querySelector(".card")
var correctEl = document.querySelector(".correct")
var wrongEl = document.querySelector(".wrong")


var currentQuestionIndex = 0;

var questions = [ 
    {
    numb: 1,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    options: [
        "Cascading Style Sheets",
        "Colorful Style Sheets",
        "Creative Style Sheets",
        "Computer Style Sheets"
    ]    
    },
        {
    numb: 2,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
        "Hyper Text Markup Language",
        "Home Depot Markup Language"
    ]    
    },
        {
    numb: 3,
    question: "Which property is used to change the background color in CSS?",
    answer: "background-color",
    options: [
        "color",
        "background-color",
        "bgcolor",
        "color-all"
    ]    
    },
        {
    numb: 4,
    question: "What is the correct syntax for referring to an external script called 'xxx.js' ?",
    answer: "<script src='xxx.js'>",
    options: [
        "<script href='xxx.js'>",
        "<script src='xxx.js'>",
        "<script name='xxx.js'>",
        "<script rel='xxx.js'>"
    ]    
    },
        {
    numb: 5,
    question: "Choose the correct HTML element for the largest heading:",
    answer: "<h1>",
    options: [
        "<h1>",
        "<head>",
        "<h6>",
        "<header>"
    ]    
    },
        {
    numb: 6,
    question: "What is the correct HTML element for inserting a line break?",
    answer: "<br>",
    options: [
        "<br>",
        "<head>",
        "<break>",
        "<lb>"
    ]    
    },
        {
    numb: 7,
    question: "Which property is used to change the left margin of an element?",
    answer: "margin-left",
    options: [
        "indent",
        "margin-left",
        "margin-right",
        "padding-left"
    ]    
    }
]

// add event listener for high score button

highScoreButton.addEventListener("click", displayHighScores);


// starts quiz and timer
startButton.addEventListener("click", function() {
    startTimer(); 
    startQuiz();   
});


// create a timer for the quiz
function startTimer() {
    
    timerCount = 60;
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount

        if (timerCount <= 0) {            
            endQuiz();
            timerEl.textContent = 0;            
        }                 
    }, 1000);        
}

// renders Quiz
function startQuiz() {    
    displayQuestion();          
}

//displays questions
function displayQuestion() {
    introEl.style.display = "none";
    cardEl.style.display = "block";
    
    var currentQuestion = questions[currentQuestionIndex];

    questionEl.innerText = currentQuestion.question;

    answerEl.forEach(function(button, index) {
        button.classList.add("show");
        button.textContent = currentQuestion.options[index];
    });

    
    optionsEl.removeEventListener("click", answerButtonClick);
    
    optionsEl.addEventListener("click", answerButtonClick);
};


// captures user answer
function answerButtonClick(event) {
    var selectedButton = event.target;
    if (selectedButton.matches(".btn")) {
        var userAnswer = selectedButton.textContent;
        checkAnswer(userAnswer);
    }
}

// checks answer
function checkAnswer(userAnswer) {
    var currentQuestion = questions[currentQuestionIndex]
    
    var userAnswerLowercase = userAnswer.toLowerCase();
    var correctAnswerLowercase = currentQuestion.answer.toLowerCase();

    if (userAnswerLowercase === correctAnswerLowercase) {
        console.log("Correct");
        correctAnswer ++;
        correctEl.textContent = correctAnswer;
    } else {
        console.log("WRONG");
        timerCount -= 10;
        wrongAnswer ++;
        wrongEl.textContent = wrongAnswer;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
        currentQuestionIndex = 0;
    }
}

// ends quiz and brings you to high score section
function endQuiz() {

    var message = "Thanks for playing! Please enter your name to save your high score =)";

    clearInterval(timer);
    console.log("end Quiz");
    setTimeout(function () {
        alert(message);
        saveHighScore();
        displayHighScores();                  
      }, 500);    
}

// prompts user for name and saves high score
function saveHighScore() {
    let highScore = JSON.parse(localStorage.getItem('highScore')) || [];

    let playerName = '';
    while (!playerName) {
    playerName = prompt("Enter name and proceed to high score page - 'Cannot be left blank' ");
    }
    
    var score = {name: playerName, correctAnswer: correctAnswer};

    highScore.push(score);

    highScore.sort((a, b) => b.correctAnswer - a.correctAnswer);

    localStorage.setItem('highScore', JSON.stringify(highScore));
}

// displays high scores at end of quiz or when high score button is clicked
function displayHighScores() {

    highScoreButton.addEventListener("click", function() {
        location.reload();
    });

    highScoreButton.textContent = "click to return";

    var highScores = JSON.parse(localStorage.getItem('highScore')) || [];
    cardEl.style.display = "none";
    introEl.style.display = "none";

    var cardItemHeader = document.createElement('h3');
    cardItemHeader.classList.add('card-item-header');
    cardItemHeader.textContent = "HIGH SCORES";
    mainEl.appendChild(cardItemHeader);

     
    // Create a new card element for each high score
    highScores.forEach(function(score, index) {

      var cardItem = document.createElement('div');
      cardItem.classList.add('card-item');

      cardItem.textContent = (index + 1) + '. ' + score.name + ' - ' + score.correctAnswer;
      mainEl.appendChild(cardItem);   
    });       
}