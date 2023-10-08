"use strict";

const titleContainer = document.querySelector(".gameTitleContainer");
const startContainer = document.querySelector(".startContainer");
const playGameBtn = document.querySelector(".play-game");
const selectMarkerContainer = document.querySelector(".selectMarker");
const boardContainer = document.querySelector(".boardContainer");
const endgameContainer = document.querySelector(".endgameContainer");
const activePlayerIndic = document.querySelector(".activePlayer");
const table = document.querySelector(".board-table");
let playerChoice;

function Gameboard() {
  const player1 = "Player 1";
  const player2 = "Player 2";
  let player1Choice;
  let player2Choice;

  const board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  return { player1Choice, player2Choice, board };
}

// Render the board's container after every move the players make
function renderBoard() {
  console.log(Gameboard().board);
}

// Transition into 'select marker' screen
playGameBtn.addEventListener("click", () => {
  titleContainer.style.paddingTop = "0px";
  startContainer.classList.add("hidden");
  setTimeout(function () {
    selectMarkerContainer.classList.remove("hidden");
  }, 1000);
});

// Select marker and transition into 'gameplay' screen
selectMarkerContainer.addEventListener("click", function (e) {
  const target = e.target.closest("i");
  Gameboard.player1Choice = target.classList.contains("fa-x") ? "X" : "O";
  Gameboard.player2Choice = Gameboard.player1Choice == "X" ? "O" : "X";

  selectMarkerContainer.classList.add("hidden");
  boardContainer.classList.remove("hidden");
});

// Gameplay
table.addEventListener("click", (e) => {
  // Guard clause
  const td = e.target.closest("td");
  if (!td) return;

  renderBoard();

  if (td.textContent == "") td.textContent = td.dataset.cell;
  else return;
});
