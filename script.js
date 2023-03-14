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
  optionsContainer.innerHTML =
    optionsContainer.innerHTML + `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML =
      buttonCon.innerHTML +
      `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
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
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
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
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_ </span>');

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
      let characterArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      if (characterArray.includes(button.innerText)) {
        characterArray.forEach((char, index) => {
          if (char === button.innerText) {
            // replace dash with letter
            dashes[index].innerText = char;

            winCount += 1;

            if (winCount == characterArray.length) {
              resultText.innerHTML = `<h2 class="win-msg">You Win!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {
        count = count + 1;
        drawStickMan(count);
        if (count === 6) {
          resultText.innerHTML = `<h2 class="lose-msg">Game Over!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  displayOptions();
  let { initialDrawing } = CanvasCreator();
  initialDrawing();
};

//canvas
const CanvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawingLine = (fromX, fromtY, toX, toY) => {
    context.moveTo(fromX, fromtY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawingLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawingLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawingLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawingLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawingLine(70, 80, 90, 110);
  };

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    drawingLine(10, 130, 130, 130);
    drawingLine(10, 10, 10, 131);
    drawingLine(10, 10, 70, 10);
    drawingLine(70, 10, 70, 20);
  };
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

const drawStickMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = CanvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
