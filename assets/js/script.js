// Import words.js
import { words } from './words.js';

const wrongLetter = document.getElementsByClassName('wrong-letters')[0]; // Selecting the wrong letters
const hint = document.getElementsByClassName('hint')[0]; // Selecting the hint and save in the variable
const gameOver = document.getElementsByClassName('game-over')[0]; // Selecting the Game Over
const congrats = document.getElementsByClassName('congrats')[0]; // Selecting the Congratulations
const wordBoxWrapped = document.getElementById('word-wrapped'); // Selecting the Word wrapped box
const btnInput = document.getElementById('btn-input'); // Selecting the input button
const restartButton = document.getElementById('btn-restart'); // Selecting the restart button
let guessesNumber = document.getElementsByClassName('guess-number')[0]; // Selecting the number of guesses
let hangmanImg = document.querySelector('.hangman-img img'); // Selecting the hangman image
let modalClose = document.getElementsByClassName('close')[0]; // Selecting the <span> element that closes the modal
let errorLetter = document.getElementsByClassName('error-letter')[0]; // Selecting the <span> element that shows the Alphabetic error
let letterInput = document.getElementById('input-letter'); // Selecting the input
let modal = document.getElementById('instructions-modal'); // Selecting the modal
let modalBtn = document.getElementById('instructions-button'); // Selecting the modal button

// Declaring the default variables;
let letterBoxes = []; // Create an array to store the letter boxes
let incorrectLetters = []; // Track incorrect letters
let guesses = 0; // Setting the number of guesses
let originalInputValue; // Declaring originalInputValue

function init() {
  // Calling the function to create the boxes.
  createBoxes(randomWord);
}

// Check if the input contains only alphabetic characters
function alphabeticLetters() {
  const isAlphabetic = /^[a-zA-Z]$/.test(originalInputValue);

  if (!isAlphabetic) {
    errorLetter.style.display = 'block';
  } else {
    errorLetter.style.display = 'none';
  }

  return isAlphabetic;
}

// Function to get a random word
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Function to see if the user wins.
function isWordGuessed() {
  return letterBoxes.every((box) => box.textContent !== '');
}

/**
 * This function reset everything in the game to the user guess the word again.
 * Everything goes to the default configs.
 */
function resetGame() {
  incorrectLetters = [];
  wrongLetter.textContent = '';

  guesses = 0;
  guessesNumber.textContent = guesses;

  gameOver.style.display = 'none';
  congrats.style.display = 'none';
  hint.style.display = 'none';

  hangmanImg.src = './assets/images/hangman-0.svg';

  letterInput.disabled = false;
  letterInput.classList.remove('disabled');
  btnInput.disabled = false;
  btnInput.classList.remove('disabled');

  const newRandomWord = getRandomWord();

  hintParagraph.textContent = `Hint: ${newRandomWord.hint}`;

  clearBoxes();

  createBoxes(newRandomWord);

  randomWord = newRandomWord;
}

// Create empty boxes for each letter in the word
function createBoxes(random) {
  random.name.split('').forEach((letter) => {
    let letterBox = document.createElement('div');
    letterBox.classList.add('word-box');
    wordBoxWrapped.appendChild(letterBox);
    letterBoxes.push(letterBox);
  });
}

// Function to clear the boxes
function clearBoxes() {
  wordBoxWrapped.innerHTML = '';
  letterBoxes = [];
}

// Setting logic to change the picture when you miss the guess
function changeImage() {
  let img = hangmanImg;
  let maxGuesses = 7;

  if (guesses < maxGuesses) {
    let i = guesses;

    img.src = `./assets/images/hangman-${i}.svg`;
  }
}

function handleGuessResult() {
  // Checking if the user still have guesses available
  if (guesses < 5) {
    guesses++;
    guessesNumber.textContent = guesses;

    changeImage();

    // Blink effect using setInterval
    const blinkInterval = setInterval(() => {
      guessesNumber.style.color = 'red';
    });

    // Stop the blinking after 200 milliseconds
    setTimeout(() => {
      clearInterval(blinkInterval);
      guessesNumber.style.color = 'black';
    }, 200);

    if (guesses === 3) {
      hint.style.display = 'block';
    }
  } else {
    guessesNumber.textContent = 6;
    // Change the 'display' to block and show the GAME OVER message!
    gameOver.style.display = 'block';

    hangmanImg.src = './assets/images/hangman-6.svg';

    // Disable the input Text, so the user can't add letter anymore.
    letterInput.disabled = true;
    letterInput.classList.add('disabled');
    btnInput.disabled = true;
    btnInput.classList.add('disabled');
  }
}

// Get a random word
let randomWord = getRandomWord();

// Setting the hint to the HTML
let hintParagraph = document.createElement('p');
hintParagraph.textContent = `Hint: ${randomWord.hint}`;
hint.appendChild(hintParagraph);

// Grab the input and check if the letter is in the word
btnInput.addEventListener('click', function () {
  originalInputValue = letterInput.value;
  letterInput.value = '';
  let charFound = false;

  // Check each letter in the word
  for (let i = 0; i < randomWord.name.length; i++) {
    const currentLetter = randomWord.name[i];

    // If the pressed key matches a letter, update the corresponding box
    if (currentLetter === originalInputValue) {
      letterBoxes[i].textContent = originalInputValue;
      charFound = true;
      alphabeticLetters();
    }
  }

  // If the pressed key is not in the word, add to incorrectLetters array and show in the screen.
  if (
    !charFound &&
    alphabeticLetters() &&
    !incorrectLetters.includes(originalInputValue)
  ) {
    incorrectLetters.push(originalInputValue);
    wrongLetter.textContent = `${incorrectLetters.join(' - ')}`;

    handleGuessResult();
  }

  // If the user guess the word, show the congrats message
  if (isWordGuessed()) {
    congrats.style.display = 'block';
  }
});

// Event Listener for the input field to handle "Enter" key
letterInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    btnInput.click();
  }
});

// Setting Event Listener to Reset the game
restartButton.addEventListener('click', function () {
  resetGame();
});

// When the user clicks the Instructions button, open the modal
modalBtn.addEventListener('click', function () {
  modal.style.display = 'block';
});

// When the user clicks on X, close the modal
modalClose.addEventListener('click', function () {
  modal.style.display = 'none';
});

// When the user clocks anywhere outside of the modal, close it
window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

init();
