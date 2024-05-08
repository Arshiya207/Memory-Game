// variables
const imgArr = [
  "cheeseburger.png",
  "fries.png",
  "hotdog.png",
  "ice-cream.png",
  "milkshake.png",
  "pizza.png",
];
let imgIndex = randomize([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
let boardPattern = [];
let imageTags = document.querySelectorAll(".board-container>div>img");
const cells = document.querySelectorAll(".board-container>div");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
let boardWinPattern = [];
let isGameStart = false;
let ScoreCounter = document.querySelector(".score-counter");
let numberOfClicksOnStart = 0;
let canClickOnReset = false;
let cellChoice = [];
let counter = 0;
// add event listener for each cell
resetBtn.addEventListener("click", reset);
startBtn.addEventListener("click", () => {
  numberOfClicksOnStart === 0
    ? startTheGame()
    : alert("please now click on reset");
});
function addEventToImgTags() {
  imageTags.forEach((img, index) => {
    img.addEventListener("click", function (e) {
      //gameCode.apply(this,[e,index])
      gameCode(e, index, this);
    });
  });
}

// functions
function reset() {
  if (!canClickOnReset) return;
  cells.forEach((cell) => {
    cell.innerHTML = "";
    const createImgTag = `<img src="images/blank.png"/>`;
    cell.innerHTML = createImgTag;
  });
  ScoreCounter.innerHTML = "Score: 0";
  imageTags = document.querySelectorAll(".board-container>div>img");
  startTheGame(imageTags);
  isGameStart = false;
  counter = 0;
}
function gameCode(e, index, imgCell) {
  if (!isGameStart) return;

  const peeredImgIndex = findPeer(index)[0][1];
  const imageItself = imgArr[peeredImgIndex];
  imgCell.setAttribute("src", "images/" + imageItself);
  imgCell.classList.remove("flip-vertical-right");
  imgCell.classList.add("flip-vertical-left");

  cellChoice.push(index);
  if (cellChoice.length === 2) {
    isGameStart = false;
    let userPattern = findPeer(cellChoice);
    if (checkForWin(userPattern)) {
      let cellChoiceCopy = cellChoice;
      counter += 1;
      ScoreCounter.innerHTML = "Score: " + counter;
      imageTags[cellChoice[0]].classList.add("fade");
      imageTags[cellChoice[1]].classList.add("fade");
      imageTags[cellChoice[0]].addEventListener("transitionend", () => {
        imageTags[cellChoiceCopy[0]].remove();
      });
      imageTags[cellChoice[1]].addEventListener("transitionend", () => {
        imageTags[cellChoiceCopy[1]].remove();
      });
      imageTags[cellChoice[0]].addEventListener("transitionend", () => {
        isGameStart = true;
      });
      cellChoice = [];
    } else {
      counter -= 1;

      ScoreCounter.innerHTML = "Score: " + counter;
      imageTags.forEach((img, index) => {
        if (index === cellChoice[0] || index === cellChoice[1]) {
          setTimeout(() => {
            img.classList.remove("flip-vertical-left");
            img.classList.add("flip-vertical-right");
            img.setAttribute("src", "images/blank.png");
            isGameStart = true;
          }, 1000);
        }
      });
      cellChoice = [];
    }
  }
}

function findPeer(arr) {
  if (arr instanceof Array) {
    const result = boardPattern.filter((cell) => {
      if (cell[0] === arr[0] || cell[0] === arr[1]) {
        return cell;
      }
    });
    return result;
  } else {
    const result = boardPattern.filter((cell) => {
      if (cell[0] === arr) {
        return cell;
      }
    });
    return result;
  }
}
function checkForWin(userSelect) {
  const result = boardWinPattern.some((cellPeer) => {
    if (cellPeer[0] === userSelect[0] && cellPeer[1] === userSelect[1]) {
      return true;
    } else if (cellPeer[0] === userSelect[1] && cellPeer[1] === userSelect[0]) {
      return true;
    }
  });

  return result;
}
function randomize(arr) {
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    let latter = Math.floor(Math.random() * arr.length);
    arr[i] = arr[latter];
    arr[latter] = current;
  }
  return arr;
}
function hidePicsAndStartClicking() {
  imageTags.forEach((tag) => {
    tag.classList.add("flip-vertical-right");
    tag.setAttribute("src", "images/blank.png");
  });
  isGameStart = true;
}
function startTheGame() {
  imgIndex = randomize([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5])
  boardPattern=[]
  boardWinPattern=[]
  
  // make peer of picture and cards
for (let i = 0; i < 12; i++) {
  boardPattern.push([i, imgIndex[i]]);
}
// make the peer for to true cards
for (let i = 0; i < 6; i++) {
  const result = boardPattern.filter((arr) => {
    if (arr[1] === i) {
      return arr;
    }
  });

  boardWinPattern.push(result);
}
  numberOfClicksOnStart += 1;
  startBtn.style.backgroundColor = "#65a965";
  canClickOnReset = false;
  for (let i = 0; i < boardPattern.length; i++) {
    imageTags[boardPattern[i][0]].setAttribute(
      "src",
      "images/" + imgArr[boardPattern[i][1]]
    );
  }
  setTimeout(hidePicsAndStartClicking, 2000);
  setTimeout(addEventToImgTags, 2000);
  setTimeout(() => {
    canClickOnReset = true;
  }, 2000);
}
