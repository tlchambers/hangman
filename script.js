const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
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

const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide")
};

const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  // if optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  // initially hides all the letter buttons, clear previous words
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();
  console.log(chosenWord);

  // replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class=dashes">_ </span>');

  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  for (let i = 65; i < 91; i = i + 1) {
    let button = document.createElement("button");
    button.classList.add("letters");
    // number to ASCII
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("")
      let dashes = document.getElementsByClassName("dashes")
      if(charArray.includes(button.innerText)){
        charArray.forEach((char, index) => {
          if(char === button.innerText){
            dashes[index].innerText = char

            winCount = winCount + 1
            if(winCount == charArray.length){
              resultText.innerHTML = `<h2 class="win-msg">You Win!</h2><p>The word was <span>${chosenWord}</span></p>`
            }
          }
          blocker()
        })
      }
    })
    letterContainer.append(button);
  }
  displayOptions();
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
