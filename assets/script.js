var timerCount;
var timerEl = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");
var timesOut = document.querySelector(".time-box")
var card = document.querySelector("main")



// create a timer for the quiz
function startTimer() {
    timerCount = 3;
    var message = "Thanks for playing! =)";

    var timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;

        if (timerCount === 0) {            
            clearInterval(timer);
            setTimeout(function () {
                alert(message); 
              }, 500);
        }                 
    }, 1000);        
}

// renders Quiz
function startQuiz() {
    card.style.backgroundColor = "white";    
    
}


// starts quiz and timer
startButton.addEventListener("click", function() {
    startTimer(); 
    startQuiz();   
});