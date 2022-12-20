import React, {useEffect, useState} from 'react';
import './App.css';

// ! Generic methods to implement on dice - random letter from dice, split array in to nested arrays, shuffle letters

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

// ! Creating dice - taken from physical game

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

// ! Picking a random letter from each dice

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

// ! Creating array of 16 letters

const letters = [letter1, letter2, letter3, letter4, letter5, letter6, letter7, letter8, letter9, letter10, letter11, letter12, letter13, letter14, letter15, letter16];

console.log("Selected letters from dice: ", letters);

// ! Shuffling 16 letters

const shuffledLetters = shuffleLetters(letters);

console.log("Now shuffled...: ", shuffledLetters);

// ! Splitting in to 4x4 nested array

let gameLetters = splitArray(shuffledLetters, 4);

console.log("Now split in to 4 x 4 board: ", gameLetters);

// ! Function to check whether word is a real word using dictionary API

async function checkRealWord(word) {
  const url = `https://wagon-dictionary.herokuapp.com/${word.toLowerCase()}`
  const response = await fetch(url);
  const responseJSON = await response.json();
  return responseJSON.found;
}

// ! Function to check whether work is on board

// // TEMPORARILY FIX GAME LETTERS
// gameLetters = [
//   ["Y","N","U","O"],
//   ["N","P","N","M"],
//   ["Z","Y","S","F"],
//   ["V","O","D","S"]
// ]

function getAllIndexes(array, value) {
  let indexes = [];
  let i = -1;
  while ((i = array.indexOf(value, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
}

function getLetterCoordinates(letter) {
  const upperCaseLetter = letter.toUpperCase();
  let coordinates = []
  let row1Indexes = getAllIndexes(gameLetters[0], upperCaseLetter)
  let row2Indexes = getAllIndexes(gameLetters[1], upperCaseLetter)
  let row3Indexes = getAllIndexes(gameLetters[2], upperCaseLetter)
  let row4Indexes = getAllIndexes(gameLetters[3], upperCaseLetter)

  for (let i = 0; i < row1Indexes.length; i++) {
    if (row1Indexes[i] !== undefined) {
      coordinates.push({
        row: 0,
        column: row1Indexes[i]
      })
    }
  }
  for (let i = 0; i < row2Indexes.length; i++) {
    if (row2Indexes[i] !== undefined) {
      coordinates.push({
        row: 1,
        column: row2Indexes[i]
      })
    }
  }
  for (let i = 0; i < row3Indexes.length; i++) {
    if (row3Indexes[i] !== undefined) {
      coordinates.push({
        row: 2,
        column: row3Indexes[i]
      })
    }
  }
  for (let i = 0; i < row4Indexes.length; i++) {
    if (row4Indexes[i] !== undefined) {
      coordinates.push({
        row: 3,
        column: row4Indexes[i]
      })
    }
  }
  return coordinates
}

function areNeighbours(a, b) {
  let n_of_a = {
      row: a.row - 1,
      column: a.column
  }
  if (JSON.stringify(b) === JSON.stringify(n_of_a)) {return true}

  let e_of_a = {
      row: a.row,
      column: a.column + 1
  }
  if (JSON.stringify(b) === JSON.stringify(e_of_a)) {return true}

  let s_of_a = {
      row: a.row + 1,
      column: a.column
  }
  if (JSON.stringify(b) === JSON.stringify(s_of_a)) {return true}

  let w_of_a = {
      row: a.row,
      column: a.column - 1
  }
  if (JSON.stringify(b) === JSON.stringify(w_of_a)) {return true}

  return false;
}

// TODO below allows tiles to be used twice...

// TODO need additional logic for "QU"....

function checkWordOnBoard(word) {
  let passedTest = true;
  let previousLetterCoordinates = undefined;

  //? if true, set this as new previousLetterCoordinates and move on to next letter

  //? iterate through letters in the word (starting with first of course)
  for (let i = 0; i < word.length; i++) {
    //? find letterCoordinates (array) of first letter on board
    let letterCoordinates = getLetterCoordinates(word[i]);
    //? if the array is empty -> passedTest = false and break
    if (letterCoordinates.length === 0) {
      passedTest = false;
      break;
    }
    //? otherwise, iterate through letterCoordinates array and check whether any of them are neighbours to previousLetterCoordinates - if not then passedTest = false and break
    if (previousLetterCoordinates) {
      for (let i = 0; i < letterCoordinates.length; i++) {
        for (let j = 0; j < previousLetterCoordinates; j++) {
          if (!areNeighbours(previousLetterCoordinates[j], letterCoordinates[i])) {
            passedTest = false;
            // console.log("Not neighbours");
            break;
          }
        }
      }
    }
    // console.log(`${word[i]} MUST BE ON BOARD AND NEIGHBOURS WOO`);
    previousLetterCoordinates = letterCoordinates;
  }
  return passedTest
}

// ! Function for input field component

function InputField({onUserInput}) {
  // props always passed in as an object

  const setInput = (event) => {
    if (event.key === "Enter") {
      // scoreWord(event.target.value);
      // console.log(event.target.value);
      // event.target.value = "";
      onUserInput(event.target.value)
      // TODO needs to clear input once enter hit!
    }
  }


  return (
    <div className="my-3">
      <h4 className="message my-3">{message}</h4>
      {/* above isn't changing... */}
      <input type="text" placeholder="Enter word and hit enter" className='w-50' onKeyUp={setInput} />
    </div>
  )
}

// TODO extract functions in to utils.js file and import

let message = "Please type word and press enter..."

const scoreWord = (word) => {
  if (!word) return
  if (checkRealWord(word) && checkWordOnBoard(word)) {
    console.log("passed");
    if (word.length >= 8) {
      message = "11 POINTS!";
      console.log("11 POINTS!");
    }
    else {
      switch (word.length) {
        case 3:
          message = "1 POINT!";
          console.log("1 POINT");
          break;
        case 4:
          message = "1 POINT!";
          console.log("1 POINT");
          break;
        case 5:
          message = "2 POINTS!";
          console.log("2 POINTS");
          break;
        case 6:
          message = "3 POINTS!";
          console.log("3 POINTS");
          break;
        case 7:
          message = "4 POINTS!";
          console.log("4 POINTS");
          break;
      }
    }
  } else {
    console.log("failed");
  }
}

// ! App function generating board and user display

// keep App function clean and slim

function App() {
  // state - nothing outside this can see it - belongs to app
  // when app dismounts (closes) state is gone - back to default
  const [input, setInput] = useState(null)
  // const [message, setMessage] = useState("Please type word and press enter...")

  // function in a function is a "callback"
  useEffect(() => {
    // anything in here only runs if input (dependancy array) changes
    scoreWord(input)
  }, [input])

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
        <InputField onUserInput={setInput}/>
        {/* onUserInput passed in to InputField() */}
      </div>
    </div>
  )
}

export default App;

// console.log("I'm the last line hehe");
