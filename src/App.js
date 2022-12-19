import React from 'react';
import './App.css';

// ! Function to generate array of random letters

const generateLetters = (length, characters) => {
  let letters = [];
  for (let i = 0; i < length; i++) {
    letters.push(characters[Math.floor(Math.random() * characters.length)])
  };
  return letters;
}

// ! Function to check whether word is a real word (using Dictionary API)

// const isWord = (str) => {

// }

// ! Creating each row of board and nesting in an array

const n = 4
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// * WOULD BE NICE TO SPECIFY LETTERS ON EACH DICE

const gameLettersRow1 = generateLetters(n, alphabet)
const gameLettersRow2 = generateLetters(n, alphabet)
const gameLettersRow3 = generateLetters(n, alphabet)
const gameLettersRow4 = generateLetters(n, alphabet)
const gameLetters = [gameLettersRow1, gameLettersRow2, gameLettersRow3, gameLettersRow4]

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

function InputField() {

  const getInput = (event) => {
    if (event.key === "Enter") {
      checkWord(event.target.value);
      event.target.value = "";
    }
  }

  const checkWord = (word) => {
    if (allGameWords.includes(word.toUpperCase())) {
      if (word.length >= 8) {
        console.log("WORD WORTH 11 POINTS!")
      }
      else {
        switch (word.length) {
          case 3:
            console.log("WORD WORTH 1 POINT!");
            break;
          case 4:
            console.log("WORD WORTH 1 POINT!");
            break;
          case 5:
            console.log("WORD WORTH 2 POINTs!");
            break;
          case 6:
            console.log("WORD WORTH 3 POINTs!");
            break;
          case 7:
            console.log("WORD WORTH 4 POINTs!");
            break;
          default:
            console.log("SOME SORT OF WEIRD ERROR...");
            break;
        }
      }
    }
    else {
      console.log("NOT VALID!")
    }
  }

  return (
    <div className="my-3">
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
