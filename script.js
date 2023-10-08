"use strict";

import * as hlp from "./helperFunctions.js";

const FADE_TIME = 1000;

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

// Create gameboard
function createGameboard() {
  const board = [
    [, , ,],
    [, , ,],
    [, , ,],
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

  return { board, winningCombos };
}

// Create player
function Player(name) {
  let marker;

  const board = [
    [, , ,],
    [, , ,],
    [, , ,],
  ];

  const updateBoard = (row, column, cell) => {
    board[row][column] = cell;
  };

  // Place marker on the board with the appropriate colors and swap the active player indicator
  const playTurn = (td, plActive, plOther, active, marker) => {
    td.style.color = plActive.style.color;
    td.textContent = marker;
    active = active == 1 ? 2 : 1;
    plActive.classList.toggle("active");
    plOther.classList.toggle("active");

    // Return the new 'activePlayer' number so we can assign the value to the variable outside of the function
    return active;
  };

  return { board, name, marker, playTurn };
}

// Render the board's container after every move the players make
function renderBoard(b, row, column, mark) {
  b.board[row][column] = mark;
}

const gameBoard = createGameboard();
const player1 = Player("Darkling");
player1.active = true;
const player2 = Player("Za warudo");
player2.active = false;

// Transition into 'select marker' screen
playGameBtn.addEventListener("click", () => {
  titleContainer.style.paddingTop = "0px";
  // startContainer.classList.add("hidden");
  hlp.smoothFadeOut(startContainer, 0);
  hlp.smoothFadeIn(selectMarkerContainer, FADE_TIME, "flex");
});

// Select marker and transition into 'gameplay' screen, adjusting the colors, names etc.
selectMarkerContainer.addEventListener("click", function (e) {
  const target = e.target.closest("i");
  if (!target) return;

  player1.marker = target.classList.contains("fa-x") ? "X" : "O";
  player2.marker = player1.marker == "X" ? "O" : "X";

  pl1.style.color = player1.marker == "X" ? "red" : "green";
  pl2.style.color = player1.marker == "X" ? "green" : "red";

  pl1.textContent = `${player1.name} (${player1.marker})`;
  pl2.textContent = `${player2.name} (${player2.marker})`;

  hlp.smoothFadeOut(selectMarkerContainer, 0);
  hlp.smoothFadeIn(boardContainer, 0, "flex");
  hlp.smoothFadeIn(activePlayerIndic, 0, "flex");
});

// Gameplay
table.addEventListener("click", (e) => {
  let count = 0;
  // Guard clause
  const td = e.target.closest("td");
  if (!td) return;

  if (td.textContent == "" && activePlayer == 1) {
    // Refer to function expression above. The line below displays the marker and the
    // appropriate colors in the board, while changing the active player indicator
    activePlayer = player1.playTurn(td, pl1, pl2, activePlayer, player1.marker);
  } else if (td.textContent == "" && activePlayer == 2) {
    activePlayer = player2.playTurn(td, pl2, pl1, activePlayer, player2.marker);
  }
  // renderBoard(gameBoard);
});
