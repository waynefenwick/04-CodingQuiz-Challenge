var timer = document.getElementById ("timer");
var startButton = document.getElementById ("startButton");
var remainingTime = 15;
var intervalId;

function startTimer() {
     startButton.disabled = true
     intervalId = setInterval(()=> {
          remainingTime--;
          timer.textContent = `${remainingTime}`;
          if (remainingTime === -1) {
               clearInterval(intervalId);
               timer.textContent = "0";
               startButton.disabled = false;
               alert("Time's Up!");
          }
     }, 1000);
}
startButton.addEventListener('click', startTimer);
