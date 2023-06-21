var timerCount;
var correctAnswer = 0;
var wrongAnswer = 0;

var timerEl = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");
var timesOut = document.querySelector(".time-box")
var card = document.querySelector("main")
var introEl = document.querySelector(".intro")
var questionEl = document.querySelector(".question")
var optionsEl = document.querySelector(".options")
var answerEl = document.querySelectorAll(".btn")
var cardEl = document.querySelector(".card")
var correctEl = document.querySelector(".correct")
var wrongEl = document.querySelector(".wrong")

var message = "Thanks for playing! =)";

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

// create a timer for the quiz
function startTimer() {
    startButton.disabled = true;
    timerCount = 80;
    var timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount <= 0) {            
            clearInterval(timer);
            timerEl.textContent = 0;
            setTimeout(function () {
                alert(message);                 
              }, 500);
        }                 
    }, 1000);        
}

// renders Quiz
function startQuiz() {    
    displayQuestion();          
}

function displayQuestion() {
    introEl.style.display = "none";
    cardEl.style.display = "block";
    
    var currentQuestion = questions[currentQuestionIndex];

    questionEl.innerText = currentQuestion.question;

    answerEl.forEach(function(button, index) {
        button.classList.add("show");
        button.textContent = currentQuestion.options[index];
    });

    // Remove existing event listener
    optionsEl.removeEventListener("click", answerButtonClick);
    // Add event listener to options container
    optionsEl.addEventListener("click", answerButtonClick);
};

function answerButtonClick(event) {
    var selectedButton = event.target;
    if (selectedButton.matches(".btn")) {
        var userAnswer = selectedButton.textContent;
        console.log(userAnswer);
        checkAnswer(userAnswer);
    }
}


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

function endQuiz() {
    console.log("end Quiz");
    setTimeout(function () {
        alert(message);                 
      }, 500); 
}


// starts quiz and timer
startButton.addEventListener("click", function() {
    startTimer(); 
    startQuiz();   
});