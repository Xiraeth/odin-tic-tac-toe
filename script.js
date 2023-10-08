"use strict";

import * as hlp from "./helperFunctions.js";

// Time in milliseconds for the different sections of the game to fade out/in
const FADE_TIME = 1000;

// Elements
const titleContainer = document.querySelector(".gameTitleContainer");
const startContainer = document.querySelector(".startContainer");
const playGameBtn = document.querySelector(".play-game");
const selectMarkerContainer = document.querySelector(".selectMarker");
const boardContainer = document.querySelector(".boardContainer");
const endgameContainer = document.querySelector(".endgameContainer");
const activePlayerIndic = document.querySelector(".activePlayerContainer");
const table = document.querySelector(".board-table");
const player1Indicator = document.querySelector("#player1");
const player2Indicator = document.querySelector("#player2");
let activePlayer = 1;
let gameOver = false;

// Create gameboard
function createGameboard() {
  let board = ["", "", "", "", "", "", "", "", ""];

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const updateBoard = (cell, marker) => {
    board[+cell] = marker;
  };

  const checkWin = (playerName, marker) => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] === marker && board[b] === marker && board[c] === marker) {
        hlp.smoothFadeOut(activePlayerIndic, FADE_TIME);
        hlp.smoothFadeIn(endgameContainer, FADE_TIME, "flex");
        endgameContainer.querySelector("h1").textContent = `${playerName} won!`;
        gameOver = true;
      }
    }
  };

  return { checkWin, updateBoard };
}

// Create player
function Player(name) {
  let marker;

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

  return { name, marker, playTurn };
}

const gameBoard = createGameboard();

const player1 = Player("Darkling");
const player2 = Player("Za warudo");

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

  player1Indicator.style.color = player1.marker == "X" ? "red" : "green";
  player2Indicator.style.color = player1.marker == "X" ? "green" : "red";

  player1Indicator.textContent = `${player1.name} (${player1.marker})`;
  player2Indicator.textContent = `${player2.name} (${player2.marker})`;

  hlp.smoothFadeOut(selectMarkerContainer, 0);
  hlp.smoothFadeIn(boardContainer, 0, "flex");
  hlp.smoothFadeIn(activePlayerIndic, 0, "flex");
});

// Gameplay
table.addEventListener("click", (e) => {
  const td = e.target.closest("td");
  if (!td) return;

  if (td.textContent == "" && activePlayer == 1 && !gameOver) {
    // Refer to function expression above. The line below displays the marker and the
    // appropriate colors in the board, while changing the active player indicator
    activePlayer = player1.playTurn(
      td,
      player1Indicator,
      player2Indicator,
      activePlayer,
      player1.marker
    );
    gameBoard.updateBoard(+td.dataset.cell, player1.marker);
    gameBoard.checkWin(player1.name, player1.marker);
  } else if (td.textContent == "" && activePlayer == 2 && !gameOver) {
    activePlayer = player2.playTurn(
      td,
      player2Indicator,
      player1Indicator,
      activePlayer,
      player2.marker
    );
    gameBoard.updateBoard(td.dataset.cell, player2.marker);
    gameBoard.checkWin(player2.name, player2.marker);
  }
});
