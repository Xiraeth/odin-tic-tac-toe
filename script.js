"use strict";

import * as hlp from "./helperFunctions.js";

const titleContainer = document.querySelector(".gameTitleContainer");
const startContainer = document.querySelector(".startContainer");
const playGameBtn = document.querySelector(".play-game");
const selectMarkerContainer = document.querySelector(".selectMarker");
const boardContainer = document.querySelector(".boardContainer");
const endgameContainer = document.querySelector(".endgameContainer");
const activePlayerIndic = document.querySelector(".activePlayerContainer");
const table = document.querySelector(".board-table");
const pl1 = document.querySelector("#player1");
const pl2 = document.querySelector("#player2");
let activePlayer = 1;

function Gameboard() {
  const player1 = "Player 1";
  const player2 = "Player 2";
  let player1Choice;
  let player2Choice;

  const board = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "O"],
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

  return { player1Choice, player2Choice, board, activePlayer };
}

// Render the board's container after every move the players make
function renderBoard() {
  console.log(Gameboard().board);
}

// Transition into 'select marker' screen
playGameBtn.addEventListener("click", () => {
  titleContainer.style.paddingTop = "0px";
  // startContainer.classList.add("hidden");
  hlp.smoothFadeOut(startContainer);
  hlp.smoothFadeIn(selectMarkerContainer, "flex");
});

// Select marker and transition into 'gameplay' screen, adjusting the colors
selectMarkerContainer.addEventListener("click", function (e) {
  const target = e.target.closest("i");
  Gameboard.player1Choice = target.classList.contains("fa-x") ? "X" : "O";
  Gameboard.player2Choice = Gameboard.player1Choice == "X" ? "O" : "X";

  pl1.style.color = Gameboard.player1Choice == "X" ? "red" : "green";
  pl2.style.color = Gameboard.player1Choice == "X" ? "green" : "red";

  pl1.textContent = `Player 1 (${Gameboard.player1Choice})`;
  pl2.textContent = `Player 2 (${Gameboard.player2Choice})`;

  hlp.smoothFadeOut(selectMarkerContainer);
  hlp.smoothFadeIn(boardContainer, "flex");
  hlp.smoothFadeIn(activePlayerIndic, "flex");
});

// Gameplay
table.addEventListener("click", (e) => {
  let count = 0;
  // Guard clause
  const td = e.target.closest("td");
  if (!td) return;

  if (td.textContent == "" && activePlayer == 1) {
    td.style.color = pl1.style.color;
    td.textContent = Gameboard.player1Choice;
    activePlayer = 2;
    pl1.classList.toggle("active");
    pl2.classList.toggle("active");
  } else if (td.textContent == "" && activePlayer == 2) {
    td.style.color = pl2.style.color;
    td.textContent = Gameboard.player2Choice;
    activePlayer = 1;
    pl1.classList.toggle("active");
    pl2.classList.toggle("active");
  }
  renderBoard();
});
