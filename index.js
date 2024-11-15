/*
Game setup and my notes
user gets 9 attemps - 3 for gallows and rope, head, body, arm, arm, leg, leg
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
store letters incorrectly guessed 
count incorrect guesses 
create a list of only letters from the alphabet as constants to check against
use toLowerCase to make sure caplocks doesn't mess it up

Maybe,
create a box for missed guesses as a counter
create a box/popup for if same letter is guessed again
*/

let bg;
let myFont;
function setup() {
  let gameArea = document.getElementById("drawingCanvas");
  let canvas = createCanvas(1122, 787);
  canvas.parent("drawingCanvas");
  bg = loadImage("./vecteezy_gallows/gamebackgroundflipnogallow.jpg");
  textFont(myFont);
}

function draw() {
  background(bg);
  drawWordLines();
  hangMan();
  guessesRemainingBox();
}

function guessesRemainingBox() {
  textFont(myFont);
  textSize(30);
  fill(215, 200, 179);
  rect(900, 250, 200, 250);
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  text("Tries Remaining", 1000, 275);
  text(`${missedGuesses}`, 997, 320);
  text("Letters Guessed", 1000, 400);
  text(`${incorrectLetters}`, 997, 440);
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let category;
const animals = [ 
  "cat",
  "dog",
  "crocodile",
  "bird",
  "mouse",
  "chicken",
  "flamingo",
  "giraffe",
  "monkey",
  "butterfly",
];
//let randAnimals = animals[Math.floor(Math.random() * animals.length)];
const tapas = [
  "patatas",
  "chorizo",
  "tortilla",
  "gambas",
  "calamares",
  "pulpo",
  "croquetas",
  "jamon",
];
//let randTapas = tapas[Math.floor(Math.random() * tapas.length)];
const cities = [
  "madrid",
  "zaragoza",
  "malaga",
  "barcelona",
  "cadiz",
  "cordoba",
  "granada",
  "sevilla",
  "santander",
  "valladolid",
  "barcelona",
  "alicante",
];
let gameWord = "";
let guessedLetters = []; // this will store letters guessed
let incorrectLetters = []; //this will store INCORRECT letters guessed
let missedGuesses = 9; // gallows& rope = 3 + head,body, arm, arm,leg, leg= 6  = 9 total

function startGame() {
  document.getElementsByClassName("winbutton")[0].style.display = "none";
  gameOver = false;
  //this is at the top to close the window from prior game  //if the window is still open
  //the [0] is critical - it's like an array, we are accessing the first   //item in the classcolection of "winbutton"  There is only one (0)   //probably better to use "querySelector("winbutton)
  guessedLetters = []; // this will store letters guessed
  incorrectLetters = []; //this will store INCORRECT letters guessed
  missedGuesses = 9; // head,body, arm, arm,leg, leg= 6

  if (category === "animals") {
    gameWord = animals[Math.floor(Math.random() * animals.length)];
    console.log("Random word from animals:", gameWord);
  } else if (category === "tapas") {
    gameWord = tapas[Math.floor(Math.random() * tapas.length)];
  } else if (category === "cities") {
    gameWord = cities[Math.floor(Math.random() * cities.length)];
  }

  gameWordArray = gameWord.split(""); // this splits the word "Hello" into array [h,e,l,l,o]
  guessedLetters = gameWordArray.map(() => "_"); //this creates an array of 5 underscores for ['_', '_', '_', '_', '_']
  //this array will be used to match the letters and store them
}

function categorySelect(chosenCategory) {
  category = chosenCategory;
  startGame();
}

document.getElementById("animalsbutton").addEventListener("click", function () {
  categorySelect("animals");
});

document.getElementById("tapasbutton").addEventListener("click", function () {
  categorySelect("tapas");
});
document.getElementById("citiesbutton").addEventListener("click", function () {
  categorySelect("cities");
});

function drawWordLines() {
  const startX = 200; // Starting X position for the lines
  const startY = 100; // Y position for the lines
  const lineLength = 40; // Length of each underscore line
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
      textSize(55); // Font size for letters
      textAlign(CENTER, CENTER);
      text(guessedLetters[i], x + lineLength / 2, startY - 20); // Display letter above line
    }
  }
}

function keyPressed() {
  if (gameOver) return; //stops my game if this happens.  it will stop by counter

  const keylower = key.toLowerCase();
  if (alphabet.includes(keylower.toLowerCase())) {
    //this compares the key against my alphabet array in lower case. Only letters allowed
    if (gameWordArray.includes(keylower)) {
      // if the key is included in gameWordArray of letters then ...
      gameWordArray.forEach((letter, index) => {
        /// then look at each (forEach) to take that key/etter and index it
        // alternatieve--- gameWordArray.forEach(function(letter,index)    //not using arrow
        if (letter === keylower) {
          // if the letter is there, put it in the guessedLetters array based on index
          guessedLetters[index] = keylower; //shorter line for fun.letter === key && (guessedLetters[index] = key);
        }
      });
      console.log("Updated guessedLetters:", guessedLetters);
      youWin();
    } else if (!incorrectLetters.includes(keylower)) {
      incorrectLetters.push(keylower); // Add letter to incorrect guesses
      missedGuesses -= 1; // Decrease attempt by 1
      console.log(
        "Incorrect guess:",
        keylower,
        "Missed guesses:",
        missedGuesses
      );

      if (missedGuesses === 0) {
        youLose();
      }
    }
  }
}

function preload() {
  myFont = loadFont("./p5font/WEST.ttf");
  verticalPost = loadImage("./vecteezy_gallows/verticalpostfinal.png");
  horizontalPost = loadImage("./vecteezy_gallows/horizontalpostfinal.png");
  rope = loadImage("./vecteezy_gallows/ropefinal.png");
}

function hangMan() {
  strokeWeight(5);
  fill(0);
  stroke(0);
  console.log("Drawing hangman with missedGuesses:", missedGuesses);
  if (missedGuesses <= 8) {   //vertical post
    image(verticalPost, 258, 157);
  }
  if (missedGuesses <= 7) { //horizontal post
    image(horizontalPost, 260, 157);
  }
  if (missedGuesses <= 6) {//rope
    image(rope, 455, 157);
  }
  if (missedGuesses <= 5) {//head
    circle(490, 350, 65);
  }
  if (missedGuesses <= 4) { //body
    line(490, 380, 490, 500);
  }
  if (missedGuesses <= 3) { // left arm
    line(490, 420, 450, 470);
  }
  if (missedGuesses <= 2) { // right arm
    line(490, 420, 530, 470);
  }
  if (missedGuesses <= 1) { // left leg
    line(490, 500, 460, 580);
  }
  if (missedGuesses <= 0) { // right leg
    line(490, 500, 520, 580);
  }
}

function youWin() {
  if (guessedLetters.toString() === gameWordArray.toString()) {
    document.getElementById("popuptext").innerText =
      "You Win! Great Job! Play Again?"; //  added later to fix the popup error. I kept gettint LOSE popup randomly
    document.getElementsByClassName("winbutton")[0].style.display = "flex";
    console.log("you won the game!");
    gameOver = true;
  }
}

function youLose() {
  document.getElementById("popuptext").innerText = "You Lose! Try Again?";
  document.getElementsByClassName("winbutton")[0].style.display = "flex";
  gameOver = true;
  console.log("lose test");
}

document.getElementById("yes").addEventListener("click", startGame);

function closePopup() {
  document.getElementsByClassName("winbutton")[0].style.display = "none"; // Hide the popup
}
