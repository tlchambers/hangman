const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-container");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-btn");
const canvas = document.getElementById("canvas")
const resultText = document.getElementById("result-text")

let options = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: [
    "Hedgehog", 
    "Rhinoceros", 
    "Squirrel", 
    "Panther", 
    "Walrus", 
    "Zebra"
  ],
  countries: [
    "France",
    "Switzerland",
    "Liechtenstein",
    "Italy",
    "Solenvia",
    "Croatia"
  ]
}

