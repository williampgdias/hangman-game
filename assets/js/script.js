// Words array
const words = [
  {
    name: 'mouse',
    hint: 'Allows you to interact with the digital world by moving and clicking.',
  },
  {
    name: 'keyboard',
    hint: 'Input device that consists of a set of keys, each with a specific function.',
  },
  {
    name: 'monitor',
    hint: 'Computer peripheral that displays visual information, making it possible for users to see images and videos.',
  },
  {
    name: 'bluetooth',
    hint: 'Wireless technology, named after a medieval king known for uniting people.',
  },
  {
    name: 'software',
    hint: 'These digital instructions and programs tell your computer or device how to perform tasks.',
  },
];

// Selecting the Word wrapped box
const wordBoxWrapped = document.querySelector('#word-wrapped');
// Selecting the wrong letters
const wrongLetter = document.querySelector('.wrong-letters');
// Selecting the hint and save in the variable
const hint = document.querySelector('.hint');
// Selecting the number of guesses
let guessesNumber = document.querySelector('.guess-number');
// Selecting the Game Over
const gameOver = document.querySelector('.game-over');

// Create an array to store the letter boxes
const letterBoxes = [];
// Track incorrect letters
let incorrectLetters = [];
// Setting the number of guesses
let guesses = 0;

// Function to get a random word
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Get a random word
const randomWord = getRandomWord();

// Create empty boxes for each letter in the word
randomWord.name.split('').forEach((letter) => {
  let letterBox = document.createElement('div');
  letterBox.classList.add('word-box');
  wordBoxWrapped.appendChild(letterBox);
  letterBoxes.push(letterBox);

  console.log(letter); // DO NOT FORGET TO DELETE THIS AFTER!
});

// Setting the hint to the HTML
let hintParagraph = document.createElement('p');
hintParagraph.textContent = `Hint: ${randomWord.hint}`;
hint.appendChild(hintParagraph);

// Check if the character pressed is in the random word
document.addEventListener('keydown', function (e) {
  const keyPressed = e.key.toLowerCase();

  // Check if the pressed key is alphabetical character
  if (/^[a-z]$/.test(keyPressed)) {
    let charFound = false;

    // Check each letter in the word
    for (let i = 0; i < randomWord.name.length; i++) {
      const currentLetter = randomWord.name[i];

      // If the pressed key matches a letter, update the corresponding box
      if (currentLetter === keyPressed) {
        letterBoxes[i].textContent = keyPressed;
        charFound = true;
      }
    }

    // If the pressed key is not in the word, add to incorrectLetters array and show in the screen.
    if (!charFound && !incorrectLetters.includes(keyPressed)) {
      incorrectLetters.push(keyPressed);
      wrongLetter.textContent = `${incorrectLetters.join(' - ')}`;

      // Checking if the user still have guesses available
      if (guesses < 5) {
        guesses++;
        guessesNumber.textContent = guesses;

        // Blink effect using setInterval
        const blinkInterval = setInterval(() => {
          guessesNumber.style.color = 'red';
        });

        // Stop the blinking after 250 milliseconds
        setTimeout(() => {
          clearInterval(blinkInterval);
          guessesNumber.style.color = 'white';
        }, 200);
      } else {
        guessesNumber.textContent = 6;
        gameOver.style.display = 'block';
      }
    }
  }
});
