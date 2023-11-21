// Words array
const words = [
  {
    id: 1,
    name: 'mouse',
    hint: 'Allows you to interact with the digital world by moving and clicking',
  },
  {
    id: 2,
    name: 'keyboard',
    hint: 'Input device that consists of a set of keys, each with a specific function',
  },
  {
    id: 3,
    name: 'monitor',
    hint: 'Computer peripheral that displays visual information, making it possible for users to see images, videos',
  },
  {
    id: 4,
    name: 'bluetooth',
    hint: 'wireless technology, named after a medieval king known for uniting people',
  },
  {
    id: 5,
    name: 'software',
    hint: 'These digital instructions and programs tell your computer or device how to perform tasks',
  },
];

// Selecting the Word wrapped box
const wordBoxWrapped = document.querySelector('#word-wrapped');

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
  console.log(letter);
  wordBoxWrapped.appendChild(letterBox);
});
