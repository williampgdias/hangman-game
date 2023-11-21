// Words array
const words = [
  {
    name: 'mouse',
    hint: 'Allows you to interact with the digital world by moving and clicking',
  },
  {
    name: 'keyboard',
    hint: 'Input device that consists of a set of keys, each with a specific function',
  },
  {
    name: 'monitor',
    hint: 'Computer peripheral that displays visual information, making it possible for users to see images, videos',
  },
  {
    name: 'bluetooth',
    hint: 'wireless technology, named after a medieval king known for uniting people',
  },
  {
    name: 'software',
    hint: 'These digital instructions and programs tell your computer or device how to perform tasks',
  },
];

// Selecting the Word wrapped box
const wordBoxWrapped = document.querySelector('#word-wrapped');
// Grabbing the hint and save in the variable
const hint = document.querySelector('.hint');

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

  console.log(letter); // DO NOT FORGET TO DELETE THIS AFTER!
});

// Setting the hint to the HTML
let hintParagraph = document.createElement('p');
hintParagraph.textContent = `Hint: ${randomWord.hint}`;
hint.appendChild(hintParagraph);
