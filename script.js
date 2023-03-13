const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-container");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: [
    "France",
    "Switzerland",
    "Liechtenstein",
    "Italy",
    "Solenvia",
    "Croatia",
  ],
};
//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;
  displayOptions()
}

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;