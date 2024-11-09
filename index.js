/*
Game setup
user gets 6 attemps - head, body, arm, arm, leg, leg
I need to have it randomly pull a word from an array of words.
I need to use a length for the word to draw the spaces
Use p5 to draw spaces on the screen for the respective word




I need an input action that checks for letters in my alphabet array and in the word chosen.
Using INDEX I will know where the letter is and how many letters match the key pressed
Then put the letter in the spaces on the screen P5 underscores

need- 
const alphabet as an array -
word split into array -'h','e','l','l','o'
I need to count the word and draw spaces FOR EACH letter -- forEach.
store the input letters guessed as an array & can't use again
sore letters incorrectly guessed 
count incorrect guesses



Use will create a list of only letters from the alphabet as constans to check against
use to.lowercase to make sure caplocks doesn't mess it up

Maybe,
create a box for missed guesses as a counter
create a box/popup for if same letter is guessed again

*/

let bg;
function setup() {
  let gameArea = document.getElementById("drawingCanvas");
  let canvas = createCanvas(1122, 787);
  canvas.parent("drawingCanvas");
  bg = loadImage("gamebackgroundflip.png");
}

function draw() {
  background(bg);
  drawWordLines();
  hangMan();
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let gameWord = "hello";
let guessedLetters = []; // this will store letters guessed
let incorrectLetters = []; //this will store INCORRECT letters guessed
let missedGuesses = 6; // head,body, arm, arm,leg, leg= 6

startGame();

function startGame() {
  gameWordArray = gameWord.split(""); // this splits the word "Hello" into array [h,e,l,l,o]
  guessedLetters = gameWordArray.map(() => "_"); //this creates an array of 5 underscores for ['_', '_', '_', '_', '_']
  //this array will be used to match the letters and store them
}

function drawWordLines() {
  const startX = 400; // Starting X position for the lines
  const startY = 100; // Y position for the lines
  const lineLength = 60; // Length of each underscore line
  const lineGap = 35; // Gap between each line

  for (let i = 0; i < guessedLetters.length; i++) {
    let x = startX + i * (lineLength + lineGap); // Calculate X position for each letter line

    // Draw the underscore line for each letter
    stroke(0); // Line color (black)
    strokeWeight(3); // Line thickness
    line(x, startY, x + lineLength, startY); // Draw the line for the letter

    // Draw guessed letter if it has been guessed correctly
    if (guessedLetters[i] !== "_") {
      noStroke(); // Disable line stroke for text
      fill(0); // Text color (black)
      textSize(32); // Font size for letters
      textAlign(CENTER, CENTER);
      text(guessedLetters[i], x + lineLength / 2, startY - 20); // Display letter above line
    
    }
  }
}

function keyPressed() {
  const keylower = key.toLowerCase();
  if (alphabet.includes(keylower.toLowerCase())) {        //this compares the key against my alphabet array in lower case. Only letters allowed
    if (gameWordArray.includes(keylower)) {         // if the key is included in gameWordArray of letters then ...
      gameWordArray.forEach((letter, index) => {           /// then look at each (forEach) to take that key/etter and index it
        // alternatieve--- gameWordArray.forEach(function(letter,index)    //not using arrow
        if (letter === keylower) {
          // if the letter is there, put it in the guessedLetters array based on index
          guessedLetters[index] = keylower; //shorter line for fun.letter === key && (guessedLetters[index] = key);
        }
      });
    } else if (!incorrectLetters.includes(keylower)) {
      incorrectLetters.push(keylower); //add letter guessed to my array and keep them
      missedGuesses -= 1; //decrease attempt by 1 try
    }
  }
}

function hangMan() {
  strokeWeight(5);
  if (missedGuesses <= 5) {
    circle(490, 350, 65); //head
  }
  if (missedGuesses <= 4) {
    line(490, 380, 490, 500);
  }
  if (missedGuesses <= 3) {
    line(490, 420, 450, 470); // Draw left arm
  }
  if (missedGuesses <= 2) {
    line(490, 420, 530, 470); // Draw right arm
  }
  if (missedGuesses <= 1) {
    line(490, 500, 460, 580); // Draw left leg
  }
  if (missedGuesses <= 0) {
    line(490, 500, 520, 580); // Draw right leg
  }
}



function win () {
if (guessedLetters.toString() === gameWordArray.toString()) {
  return window.alert("You Win!");
}
}


/*
function lose

/*
const animals = ["cat", "dog", "crocodile", "bird", "mouse", "chicken"];

animals[Math.floor(Math.random() * animals.length)];
*/
