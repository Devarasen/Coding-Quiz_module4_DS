var timerCount;
var timerEl = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");
var timesOut = document.querySelector(".time-box")
var card = document.querySelector("main")

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
]


// create a timer for the quiz
function startTimer() {
    startButton.disabled = true;
    timerCount = 3;
    var message = "Thanks for playing! =)";
    var timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount === 0) {            
            clearInterval(timer);
            setTimeout(function () {
                alert(message);
                startButton.disabled = false; 
              }, 500);
        }                 
    }, 1000);        
}

// renders Quiz
function startQuiz() {
    card.style.backgroundColor = "white";
    setTimeout(function () {
        card.style.backgroundColor = "#d3d3ec" ;
    }, 1000)        
}


// starts quiz and timer
startButton.addEventListener("click", function() {
    
    startTimer(); 
    startQuiz();   
});