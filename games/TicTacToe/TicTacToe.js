//Show Who Win or Nobody Win and Restart button
let showClass = function() {
  let elemClass = document.getElementById("new-game")
  elemClass.classList.toggle('show')
  return true
}
//Add Text Who Win or Nobody Win
let showText = function(player = null) {
  let elemText = document.getElementById("winText")
  if (player === null) {
    elemText.innerHTML = "The board is full, Nobody wins";
    return true
  } else {
    elemText.innerHTML = "Winner Player " + player
    return true
  }
}
// Clear full Restart button function
let clearSquare = function() {
  let square = document.getElementsByClassName("square");

  let res__text = document.getElementById("winText")
  for (let i = 0; i < square.length; i++) {
    square[i].innerHTML = ''
    square[i].style = ''
    res__text.innerHTML = ''
  }
  showClass();
  return true;
}
// Check Full Board Text
let isFull = function(square) {
  let i = 0;
  while (i < square.length) {
    if (square[i].textContent === '') {
      return false;
    }
    i++;
  }
  return true;
};
// Win function
let calcWin = function(player, square) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (square[a].textContent && square[a].textContent === square[b].textContent && square[a].textContent === square[c].textContent) {
      square[a].style.transform = 'scale(1.3)';
      square[b].style.transform = 'scale(1.3)';
      square[c].style.transform = 'scale(1.3)';
      showText(player)
      showClass()
      return true;
    }
  }
  return false
}

let player = 'X';
let click = document.querySelector('.game-board');

// Event Click
click.onclick = function(event) {
  let targetE = event.target
  let square = document.getElementsByClassName("square");
  send(targetE, square)
};
// Send data
let send = function(targetE, square) {
  if (targetE.innerHTML === '') {
    if (player === 'X') {
      targetE.setAttribute("style", "color:#ff78E0;box-shadow: 0px 0px 20px 9px;")
    } else {
      targetE.setAttribute("style", "color:#00FFE5;box-shadow: 0px 0px 20px 9px;")
    }
    targetE.innerHTML = player;
    let winPlayer = calcWin(player, square);
    player = player === "X" ? "O" : "X";
    if (isFull(square) && winPlayer !== true) {
      showText()
      showClass()
    }
  }
}
