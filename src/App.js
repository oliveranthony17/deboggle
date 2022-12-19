import React from 'react';
import './App.css';

// ! Function to generate array of random letters

// const generateLetters = (length, characters) => {
//   let letters = [];
//   for (let i = 0; i < length; i++) {
//     letters.push(characters[Math.floor(Math.random() * characters.length)])
//   };
//   return letters;
// }

// ! Changed method to actually replicate dice (taken from own game)

const randomLetter = (letters) => {
  let letter = letters[Math.floor(Math.random() * letters.length)]
  return letter;
}

const splitArray = (array, chunkSize) => {
  let splitArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    splitArray.push(chunk)
  }
  return splitArray;
}

const shuffleLetters = (letters) => {
  let a = letters
  const n = letters.length

  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a
}

// ! Creating each row of board and nesting in an array

const n = 4
// const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const dice1 = ["H","S","P","A","C","O"]
const dice2 = ["E","E","G","N","A","A"]
const dice3 = ["T","E","R","W","H","V"]
const dice4 = ["T","Y","E","L","T","R"]
const dice5 = ["D","R","Y","V","L","E"]
const dice6 = ["H","N","L","N","Z","R"]
const dice7 = ["L","R","E","I","X","D"]
const dice8 = ["G","E","W","N","H","E"]
const dice9 = ["S","N","E","I","E","U"]
const dice10 = ["A","W","T","O","T","O"]
const dice11 = ["Y","T","D","T","S","I"]
const dice12 = ["B","O","B","J","A","O"]
const dice13 = ["I","U","N","H","M","QU"]
const dice14 = ["C","M","U","O","T","I"]
const dice15 = ["K","F","A","F","P","S"]
const dice16 = ["T","S","E","O","I","S"]

// ! below is for random letters - changed method to use virtual dice

// const gameLettersRow1 = generateLetters(n, alphabet)
// const gameLettersRow2 = generateLetters(n, alphabet)
// const gameLettersRow3 = generateLetters(n, alphabet)
// const gameLettersRow4 = generateLetters(n, alphabet)

const letter1 = randomLetter(dice1);
const letter2 = randomLetter(dice2);
const letter3 = randomLetter(dice3);
const letter4 = randomLetter(dice4);
const letter5 = randomLetter(dice5);
const letter6 = randomLetter(dice6);
const letter7 = randomLetter(dice7);
const letter8 = randomLetter(dice8);
const letter9 = randomLetter(dice9);
const letter10 = randomLetter(dice10);
const letter11 = randomLetter(dice11);
const letter12 = randomLetter(dice12);
const letter13 = randomLetter(dice13);
const letter14 = randomLetter(dice14);
const letter15 = randomLetter(dice15);
const letter16 = randomLetter(dice16);

let letters = [letter1, letter2, letter3, letter4, letter5, letter6, letter7, letter8, letter9, letter10, letter11, letter12, letter13, letter14, letter15, letter16];

console.log(letters);
let shuffledLetters = shuffleLetters(letters);
console.log(shuffledLetters);
let gameLetters = splitArray(shuffledLetters, 4);
console.log(gameLetters);

// const gameLetters = splitArray(shuffleLetters(letters));
// console.log(gameLetters);

// ! Initialise empty array of all words and also array of correct words

const allGameWords = []
const correctGameWords = []

// ! Recursive function to generate all words from grid of min length 3

const findWordsRecursive = (letters, visited, i, j, str) => {
  // mark current cell as visited
  visited[i][j] = true;
  // append current letter to Str
  str = str + letters[i][j];

  // if word exists then push to words array
  if (str.length >= 3) {
    // console.log(str);
    allGameWords.push(str);
  }

  // traverse the 8 adjacent cells of [i][j] row by row starting top left - skips out [i][j] as marked visited as true
  for (let row = i; row <= i + 1 && row < n; row++)
    for (let col = j; col <= j + 1 && col < n; col++)
      if (row >= 0 && col >= 0 && !visited[row][col])
        findWordsRecursive(letters, visited, row, col, str);

  // erase current letters from string
  str = "" + str[str.length - 1];
  // set visited to false
  visited[i][j] = false;
}

const findWords = (letters) => {
  let visited = Array.from(Array(n), () => new Array(n).fill(0));

  var str = "";

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      findWordsRecursive(letters, visited, i, j, str);
    }
  }
}

// ! Create all words from our gameLetters array (even made up words!!)

findWords(gameLetters)

// ! Check each word in allGameWords

allGameWords.forEach((word, i) => {
  const url = `https://wagon-dictionary.herokuapp.com/${word}`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.found) {
        console.log(word);
        correctGameWords.push(word)
      }
    })
})

console.log("Correct words:", correctGameWords);

// ! Function for input field component

let message = "Please type word and press enter..."

function InputField() {

  const getInput = (event) => {
    if (event.key === "Enter") {
      checkWord(event.target.value);
      console.log(event.target.value);
      event.target.value = "";
    }
  }

  const checkWord = (word) => {
    console.log(word.toUpperCase());
    console.log(word.length);
    if (allGameWords.includes(word.toUpperCase())) {
      if (word.length >= 8) {
        message = "11 POINTS!";
        console.log("11 POINTS!");
      }
      else {
        switch (word.length) {
          case 3:
            message = "1 POINT!";
            console.log("1 POINT!");
            break;
          case 4:
            message = "1 POINT!";
            console.log("1 POINT!");
            break;
          case 5:
            message = "2 POINTS!";
            console.log("2 POINTS!");
            break;
          case 6:
            message = "3 POINTS!";
            console.log("3 POINTS!");
            break;
          case 7:
            message = "4 POINTS!";
            console.log("4 POINTS!");
            break;
        }
      }
    }
    console.log(message);
  }

  return (
    <div className="my-3">
      <h4 className="message my-3">{message}</h4>
      {/* above isn't changing... */}
      <input type="text" placeholder="Enter word and hit enter" className='w-50' onKeyUp={getInput} />
    </div>
  )
}

// ! App function generating board and user display

function App() {

  return (
    <div className="App">
      <header className="App-header py-3">
        <h1>DeBoggle</h1>
      </header>
      <div className="game-container justify-content-center">
        <div className="row game-row justify-content-center">
          <div className="col-3 game-tile">{gameLetters[0][0]}</div>
          <div className="col-3 game-tile">{gameLetters[0][1]}</div>
          <div className="col-3 game-tile">{gameLetters[0][2]}</div>
          <div className="col-3 game-tile">{gameLetters[0][3]}</div>
        </div>
        <div className="row game-row justify-content-center">
          <div className="col-3 game-tile">{gameLetters[1][0]}</div>
          <div className="col-3 game-tile">{gameLetters[1][1]}</div>
          <div className="col-3 game-tile">{gameLetters[1][2]}</div>
          <div className="col-3 game-tile">{gameLetters[1][3]}</div>
        </div>
        <div className="row game-row justify-content-center">
          <div className="col-3 game-tile">{gameLetters[2][0]}</div>
          <div className="col-3 game-tile">{gameLetters[2][1]}</div>
          <div className="col-3 game-tile">{gameLetters[2][2]}</div>
          <div className="col-3 game-tile">{gameLetters[2][3]}</div>
        </div>
        <div className="row game-row justify-content-center">
          <div className="col-3 game-tile">{gameLetters[3][0]}</div>
          <div className="col-3 game-tile">{gameLetters[3][1]}</div>
          <div className="col-3 game-tile">{gameLetters[3][2]}</div>
          <div className="col-3 game-tile">{gameLetters[3][3]}</div>
        </div>
        <InputField />
      </div>
    </div>
  )
}

export default App;
