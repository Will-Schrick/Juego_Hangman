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
  bg = loadImage("./vecteezy_gallows/gamebackgroundflip.png");
}

function draw() {
  background(bg);
  drawWordLines();
  hangMan();
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let category;
const animals = ["cat", "dog", "crocodile", "bird", "mouse", "chicken"];
let randAnimals = animals[Math.floor(Math.random() * animals.length)];
const tapas = ["patatas", "chorizo", "tortilla", "gambas", "calamares", "pulpo"];
let randTapas = tapas[Math.floor(Math.random() * tapas.length)];
let gameWord = "";
let guessedLetters = []; // this will store letters guessed
let incorrectLetters = []; //this will store INCOdogRRECT letters guessed
let missedGuesses = 6; // head,body, arm, arm,leg, leg= 6

function startGame() {
  document.getElementsByClassName("winbutton")[0].style.display = "none";  
  //this is at the top to close the window from prior game
  //if the window is still open
  //the [0] is critical - it's like an array, we are accessing the first 
  //item in the classcolection of "winbutton"  There is only one (0)
  //probably better to use "querySelector("winbutton)
  guessedLetters = []; // this will store letters guessed
  incorrectLetters = []; //this will store INCORRECT letters guessed
  missedGuesses = 6; // head,body, arm, arm,leg, leg= 6
   //gameWord = animals[Math.floor(Math.random() * animals.length)];
  gameWordArray = gameWord.split(""); // this splits the word "Hello" into array [h,e,l,l,o]
  guessedLetters = gameWordArray.map(() => "_"); //this creates an array of 5 underscores for ['_', '_', '_', '_', '_']
  //this array will be used to match the letters and store them
}
  function categorySelect(category) {
     if (category === animals) {
      gameWord = randAnimals;
      console.log("Random word from animals:", gameWord);
      } 
      else if (category === 'tapas') {
      gameWord = randTapas;
      }
    
     // 
  startGame();
  }


document.getElementById('animalsbutton').addEventListener("click", function() 
  {
  categorySelect(animals);
  });

document.getElementById('tapasbutton').addEventListener("click", function() 
  {
  categorySelect('tapas');
  });




function drawWordLines() {
  const startX = 200; // Starting X position for the lines
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
      console.log("Correct guess:", keylower);
      youWin();
      
    } else if (!incorrectLetters.includes(keylower)) {
      incorrectLetters.push(keylower); //add letter guessed to my array and keep them
      missedGuesses -= 1; //decrease attempt by 1 try
      console.log("Incorrect guess:", keylower, "Missed guesses:", missedGuesses);
      if (missedGuesses === 0) {
      youLose();
        
       
      }
    }
  }
}

function hangMan() {
  strokeWeight(5);
  fill(0);
  stroke(0);
  console.log("Drawing hangman with missedGuesses:", missedGuesses);
  if (missedGuesses <= 5) {
    circle(490, 350, 65); //head
  }
  if (missedGuesses <= 4) {  //body
    line(490, 380, 490, 500);
  }
  if (missedGuesses <= 3) {
    line(490, 420, 450, 470); // left arm
  }
  if (missedGuesses <= 2) {
    line(490, 420, 530, 470); // right arm
  }
  if (missedGuesses <= 1) {
    line(490, 500, 460, 580); // left leg
  }
  if (missedGuesses <= 0) {
    line(490, 500, 520, 580); // right leg
   }
}

function youWin () {
if (guessedLetters.toString() === gameWordArray.toString()) {
  document.getElementsByClassName("winbutton")[0].style.display = "flex"; 
  
  }
}

function youLose() {
  //console.log("you loose test");
  //console.log(document.getElementById("popuptext"));
  document.getElementById("popuptext").innerText = "You Lose! Try Again?";
  document.getElementsByClassName("winbutton")[0].style.display = "flex";
}

function closePopup() {
  document.getElementsByClassName("winbutton")[0].style.display = "none"; // Hide the popup
 
}




/*
const animals = ["cat", "dog", "crocodile", "bird", "mouse", "chicken"];

animals[Math.floor(Math.random() * animals.length)];
*/
