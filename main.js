// Variables
var min = 1;
var max = 100;
var nGuesses = 0;
var randInt = getRandInt(min, max);
var minInput = document.querySelector(".article__form__input--min-range");
var maxInput = document.querySelector(".article__form__input--max-range");
var minDisplay = document.querySelector(".bold--min");
var maxDisplay = document.querySelector(".bold--max");
var updateButton = document.querySelector(".article__form__button--update");
var submitButton = document.querySelector(".article__div__button--submit");
var clearButton = document.querySelector(".article__div__button--clear");
var restartButton = document.querySelector(".article__div__button--restart");
var challengerOneInput = document.querySelector(".article__form__input--nameOne");
var challengerTwoInput = document.querySelector(".article__form__input--nameTwo");
var challengerOneLabel = document.querySelector(".article__paragraph--challenger-1");
var challengerTwoLabel = document.querySelector(".article__paragraph--challenger-2");
var challengerOneLatestGuess = document.querySelector(".span--challenger-1");
var challengerTwoLatestGuess = document.querySelector(".span--challenger-2");
var guessOneInput = document.querySelector(".article__form__input--guessOne");
var guessTwoInput = document.querySelector(".article__form__input--guessTwo");
var latestGuessOne = document.querySelector(".span--number-1");
var latestGuessTwo = document.querySelector(".span--number-2");
var guessMessageOne = document.querySelector(".span--high-low-1");
var guessMessageTwo = document.querySelector(".span--high-low-2");

// Event Listeners
updateButton.addEventListener('click', onUpdateButton);

submitButton.addEventListener('click', onSubmitButton);

clearButton.addEventListener('click', onClearButton);

restartButton.addEventListener('click', onRestartButton);

// Functions 
function onUpdateButton() {
  updateRange();
  randInt = getRandInt(min, max);
}

function onSubmitButton() {
  checkInput(challengerOneInput);
  checkInput(challengerTwoInput);
  updateGuess();
  updateName();
  updateLatestGuess();
  setTimer();
  checkGuess(guessOne, guessMessageOne, challengerOneInput);
  checkGuess(guessTwo, guessMessageTwo, challengerTwoInput);
  enableClearButton();
  enableRestartButton();
}

function onClearButton() {
  clearForm();
  clearLatestGuess();
  clearButton.disabled = true;  
}

function onRestartButton() {
  clearForm();
  clearLatestGuess();
  clearName();
  randInt = getRandInt(min, max);
  restartButton.disabled = true;
  clearButton.disabled = true;  
}


function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setTimer() {
  if (nGuesses === 0) {
    timer = 0;
    timerId = setInterval(function() {timer++;}, 1000);
  }
}

function checkInput(elementValue) {
  var letters = /[0-9a-zA-Z]/;
  if (elementValue.value.match(letters)){
    return true;
  } else {
    alert('Enter a name');
    return false;
  }
}

function checkGuess(guess, message, challenger) {
  if (guess > randInt) {
    message.innerText = "that's too high";
  } else if (guess < randInt) {
    message.innerText = "that's too low";
  } else if (guess === randInt) {
    message.innerText = "BOOM!"
    makeCard(challenger.value);
    clearForm(); 
    clearLatestGuess();
    randInt = getRandInt(min, max);   
  }  
}

function clearForm() {
  challengerOneInput.value = "";
  challengerTwoInput.value = "";
  guessOneInput.value = "";
  guessTwoInput.value = "";
}

function clearLatestGuess() {
  guessMessageOne.innerText = "";
  guessMessageTwo.innerText = "";  
  latestGuessOne.innerText = "";  
  latestGuessTwo.innerText = "";
  nGuesses = 0;  
}

function clearName() {
  challengerOneLabel.innerText = "Challenger 1";
  challengerTwoLabel.innerText = "Challenger 2";
  challengerOneLatestGuess.innerText = "Challenger 1";
  challengerTwoLatestGuess.innerText = "Challenger 2";  
}

function updateGuess() {
  guessOne = Math.round(parseInt(guessOneInput.value));
  guessTwo = Math.round(parseInt(guessTwoInput.value));
  nGuesses ++;
}

function updateRange() {
  min = parseInt(minInput.value);
  max = parseInt(maxInput.value);
  minDisplay.innerText = min;
  maxDisplay.innerText = max;
  minInput.value = "";
  maxInput.value = "";  
}

function updateName() {
  challengerOneLabel.innerText = challengerOneInput.value;
  challengerTwoLabel.innerText = challengerTwoInput.value;  
  challengerOneLatestGuess.innerText = challengerOneInput.value;
  challengerTwoLatestGuess.innerText = challengerTwoInput.value;
}

function updateLatestGuess() {
  latestGuessOne.innerText = guessOne; 
  latestGuessTwo.innerText = guessTwo;   
}

function enableClearButton() {
  if (guessOneInput.value === "" && guessTwoInput.value === "" && challengerOneInput.value === "" && challengerTwoInput.value === "") {
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;  
  }
}

function enableRestartButton() {
  if (nGuesses >= 1) {
    restartButton.disabled = false;
  }
}

function makeCard(winner) {
  document.querySelector('.section--right').insertAdjacentHTML('afterbegin', `<article class="article--winner-card">
        <p class="header--winner-card">
           <span class="span__challenger1-name">${challengerOneInput.value.toUpperCase()}</span> 
              <span class="versus">VS</span>
          <span class="span__challenger2-name">${challengerTwoInput.value.toUpperCase()}</span></p>
      <div class="article__div__winner-card">
        <p class="challenge-winner">
          <span class="winning-challenger-name">${winner}</span><br/>
          WINNER
        </p>
      </div>
      <div class="bottom-data-line">
        <p class="bottom-data-line-paragraph"><span class="total-number-guesses">${nGuesses * 2}</span> guesses</p>
        <p class="bottom-data-line-paragraph"><span class="total-time-spent"> ${(timer / 60).toFixed(2)}</span> minutes</p>
      <button type="button" class="winner-card-close-button">&times;</button>
    </div>
  </article>`);
}





