var startGm = document.querySelector('#startGm');//HTML id="startButton"
var timerElement = document.querySelector('#timer');//HTML id="timer"
var challengeArea = document.querySelector('#challenge');
var home = document.querySelector('#home');

var timer;
var timerCount;
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;

var questions = [
     {
          question: "1. HTML is the standard markup language for creating Web pages?",
          choices: ["a. True", "b. False"],
          answer: "a. True"
     },
     {
          question: "2. CSS is:",
          choices: ["a. A standard language for storing, manipulating and retrieving data",
                    "c. The programming language of the Web",
                    "d. The language we use to style an HTML document",
                    "e. A JavaScript Library"],
          answer: "d. The language we use to style an HTML document"
     },
     {
          question: "3. All HTML elements can have attributes",
          choices: ["a. True", "b. False"],
          answer: "a. True"
     },
     {
          question: "4. Considered the programming language of Web",
          choices: ["a. SQL", "b. Python", "c. JavaScript", "d. jQuerry"],
          answer: "c. JavaScript"
     },
     {
          question: "5. jQuerry is a JavaScript library",
          choices: ["a. True", "b. False"],
          answer: "a. True"
     },
     {
          question: "6. React",
          choices: ["a. Is a JavaScript library for building user interfaces", 
                    "b. Is used to build single-page applications",
                    "c. Allows us to create reusable UI components", 
                    "d. All of the above"],
          answer: "d. All of the above"
     },
     {
          question: "7. Bootstrap relates to...",
          choices: ["a. JavaScript", 
                    "b. CSS",
                    "c. HTML", 
                    "d. Boots you wear"],
          answer: "b. CSS"
     },
     ]

function startGame(event) {
     event.preventDefault();
     console.log('Button was pressed!');
     currentQuestion = 0;
     currentAnswers = 0;
     startTimer();
     showQuestion();
     }

function startTimer() {
     timerCount = 50;
     timer = setInterval(function() {
          timerCount--;
          timerElement.textContent = timerCount;
          if (timerCount === 0) {
          clearInterval(timer);
          startGm.disabled = false;//add what happens after this
          }
     },1000);
     }

function showQuestion() {
     currentQuestion++;
     if (currentQuestion <= questions.length) {
          var questionObj = questions[currentQuestion-1];
          var questionHtm1 = '<div class="questions">' +questionObj.question + '</div>';
          questionHtm1 += '<ol class="answerList">';
          for (var i = 0; i < questionObj.choices.length; i++) {
               questionHtm1 += '<button class="answerBtn" onClick="checkAnswer(\''
               + questionObj.choices[i] + '\')">' + questionObj.choices[i] + '</button>';
          }
          questionHtm1 += '</ol>';
          challengeArea.innerHTML = questionHtm1;
          }
     }

function checkAnswer(answer) {
     var questionObj = questions[currentQuestion-1];
     if (answer === questionObj.answer) {
          correctAnswers++;
          challengeArea.innerHTML = '<div class="correctIncorrect">🏆🙌Correct!🙌🏆</div>';
     }
     else {
          incorrectAnswers++;
          challengeArea.innerHTML = '<div class="correctIncorrect">👎Incorrect!👎</div>';
          timerCount -= 10;
          timerElement.textContent = timerCount;
     }
     if (currentQuestion === questions.length) {  // check if it's the last question
          clearInterval(timer);
          setTimeout(function() {
               gameOver();
          }, 1000);
     } else {
          setTimeout(showQuestion, 1000);
     }
     }  

function gameOver() {
     if (currentQuestion === questions.length) {
          challengeArea.innerHTML = '<div id="assessment">You answered ' + correctAnswers + 
          ' out of ' + questions.length + ' questions correctly</div>' +
          '<h1 id="gameOver">Game Over!</h1>' +
          '<p id="score">You scored ' + timerCount + ' out of 50</p>' +
          '<form id="name">' +
          '<label for="nameInput">Enter your name:</label>' +
          '<input type="text" id="nameInput" name="nameInput"><br>' +
          '<button id="saveBtn">Save Score</button>' +
          '</form>';
          currentQuestion = 0;
          correctAnswers = 0;
          var score = timerCount;
          var saveBtn = document.getElementById("saveBtn");
          saveBtn.addEventListener("click", saveScore);
          }
     }

function saveScore(event) {
     event.preventDefault();
     var nameInput = document.querySelector("#nameInput");
     if (!nameInput.value) {
          alert("Please enter your name to save your score.");
          return;
     }    
     var scoreObj = {
          initials: event.target.parentElement.children[1].value,
          score: timerCount
     }
     var scores = JSON.parse(localStorage.getItem("scores")) || [];
     scores.push(scoreObj);
     // sets the score into local storage
     localStorage.setItem("scores", JSON.stringify(scores));
     document.querySelector("#nameInput").value = "";
     window.location = "index.html";
     }

function viewHighScores(event) {
     event.preventDefault();
     var scores = JSON.parse(localStorage.getItem("scores")) || [];
     var scoreList = '<ul id="scoreNameList">';
     for (var i = 0; i < scores.length; i++) {
          scoreList += '<li id="scoreNameList">' + scores[i].initials + ' - ' + scores[i].score + '</li>';
     }
     scoreList += '</ul>';
     challengeArea.innerHTML = '<h1 id="highScores"><u>High Scores</u></h1>' + scoreList;

     var homeBtn = document.createElement("button");
     homeBtn.id = "home";
     homeBtn.textContent = "Home";
     homeBtn.addEventListener('click', goHome);
     challengeArea.appendChild(homeBtn);
     }

     var viewHighScoresBtn = document.getElementById("viewHighScores").querySelector('a');
     viewHighScoresBtn.addEventListener('click', viewHighScores);

function goHome() {
     window.location.href = "index.html";
     }

startGm.addEventListener('click', startGame);