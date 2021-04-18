// Variables needed for the game
const sizeAlert = document.getElementById("alert");
const closeBtn = document.getElementById("closebtn")
const sizeInput = document.getElementById("block-size__inp");
const changeSize = document.getElementById("change-size");
const scoreLabel = document.getElementById("score");
const elemClass = document.getElementById("game-over");
const titleOver = document.getElementById("game-over__title");
const restartGame = document.getElementById("restart")
const sizeTitle = document.getElementById("block-size__title");
const scoreFinal = document.getElementById("score__result");
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = 0;
let size = 4;
let width = canvas.width / size - 6;
let cells = [];
let fontSize;
let loss = false;
startGame();

// Change size board
changeSize.onclick = function() {
  if (sizeInput.value >= 2 && sizeInput.value <= 20) {
    sizeAlert.classList.remove("alert-show");
    score = 0;
    scoreLabel.innerHTML = "Score : " + score;
    size = sizeInput.value;
    width = canvas.width / size - 6;
    canvasClean();
    startGame();
  } else {
    sizeAlert.classList.add("alert-show");
  }
};

// Close Warnings
closeBtn.onclick = function() {
  sizeAlert.classList.toggle("alert-show");
}

// The function helps create cells
function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}
// Created cells for the game
function createCells() {
  let i, j;
  for (i = 0; i < size; i++) {
    cells[i] = [];
    for (j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}
// Draws cells with numbers for the game
function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);
  switch (cell.value) {
    default:
      ctx.fillStyle = "#000";
  }
  ctx.fill();
  if (cell.value) {
    fontSize = width / 2;
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = "purple";
    switch (cell.value) {
      case 0:
        ctx.fillStyle = "#000";
        break;
      case 2:
        ctx.fillStyle = "#bdbdbd";
        break;
      case 4:
        ctx.fillStyle = "#EB0D79";
        break;
      case 8:
        ctx.fillStyle = "#A20025";
        break;
      case 16:
        ctx.fillStyle = "#F49F01";
        break;
      case 32:
        ctx.fillStyle = "#293367";
        break;
      case 64:
        ctx.fillStyle = "#54C906";
        break;
      case 128:
        ctx.fillStyle = "#038BCB";
        break;
      case 256:
        ctx.fillStyle = "#00ffad";
        break;
      case 512:
        ctx.fillStyle = "#00dcff ";
        break;
      case 1024:
        ctx.fillStyle = "#FF7F50";
        break;
      case 2048:
        ctx.fillStyle = "#A025AD";
        break;
      case 4096:
        ctx.fillStyle = "#ffbf00";
        break;
    }
    ctx.textAlign = "center";
    ctx.fillText(
      cell.value,
      cell.x + width / 2,
      cell.y + width / 2 + width / 7
    );
  }
}

// Cleaning canvas
function canvasClean() {
  ctx.clearRect(0, 0, 500, 500);
}
// Event keyboard key for moving numbers
document.onkeydown = function(event) {
  if (!loss) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      moveUp();
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      moveRight();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      moveDown();
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      moveLeft();
    }
    scoreLabel.innerHTML = "Score : " + score;
  }
};
// Function for starting the game
function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
}
// Function for starting the game
function finishGame() {
  canvas.style.opacity = "0.5";
  scoreFinal.innerHTML = "Score " + score;
  loss = true;
  elemClass.classList.toggle("show");
}
// Finish function to stop the game
function drawAllCells() {
  let i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}
// Addition(paste) of cells during the game
function pasteNewCell() {
  let countFree = 0;
  let i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if (!countFree) {
    finishGame();
    return;
  }
  while (true) {
    let row = Math.floor(Math.random() * size);
    let coll = Math.floor(Math.random() * size);
    if (!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  }
}
// Move right numbers
function moveRight() {
  let i, j;
  let coll;
  for (i = 0; i < size; i++) {
    for (j = size - 2; j >= 0; j--) {
      if (cells[i][j].value) {
        coll = j;
        while (coll + 1 < size) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          } else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score += cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}
// Move left numbers
function moveLeft() {
  let i, j;
  let coll;
  for (i = 0; i < size; i++) {
    for (j = 1; j < size; j++) {
      if (cells[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          } else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score += cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}
// Move up numbers
function moveUp() {
  let i, j, row;
  for (j = 0; j < size; j++) {
    for (i = 1; i < size; i++) {
      if (cells[i][j].value) {
        row = i;
        while (row > 0) {
          if (!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score += cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}
// Move down numbers
function moveDown() {
  let i, j, row;
  for (j = 0; j < size; j++) {
    for (i = size - 2; i >= 0; i--) {
      if (cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score += cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}
// Function for restarting the game
restartGame.onclick = function() {
  elemClass.classList.toggle("show");
  canvasClean();
  score = 0;
  scoreLabel.innerHTML = "Score : " + score;
  canvas.style.opacity = "1";
  loss = false;
  startGame();
}

// Hover style change Size
sizeInput.onmouseover = function () {
  sizeTitle.classList.add("animation");
}

sizeInput.onmouseout = function () {
  sizeTitle.classList.remove("animation");
}

// Hover style Game Over title
restartGame.onmouseover = function() {
  titleOver.classList.add("game-over__title-hover");
  scoreFinal.classList.add("score__result-hover");
}

restartGame.onmouseout = function() {
  titleOver.classList.remove("game-over__title-hover");
  scoreFinal.classList.remove("score__result-hover");
}
