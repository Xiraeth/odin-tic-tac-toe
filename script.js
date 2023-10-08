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
const resultName = document.querySelector("#result-name");
const resultWon = document.querySelector("#result-won");
const replayBtn = document.querySelector(".replayBtn");
const exitBtn = document.querySelector(".exitBtn");
let turn = 0;
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

  const renderBoard = (cell, activePlayer, marker) => {
    cell.style.color = activePlayer.style.color;
    cell.textContent = marker;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    const cell = table.querySelectorAll("td");
    cell.forEach((cell) => {
      cell.style.color = "black";
      cell.textContent = "";
    });
  };

  const checkWin = (playerName, marker) => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] === marker && board[b] === marker && board[c] === marker) {
        hlp.smoothFadeOut(activePlayerIndic, FADE_TIME);
        hlp.smoothFadeIn(endgameContainer, FADE_TIME, "flex");
        resultName.style.color =
          activePlayer == 1
            ? player1Indicator.style.color
            : player2Indicator.style.color;
        resultName.textContent = `${playerName} `;
        resultWon.textContent = `won!`;
        gameOver = true;
      }
    }
  };

  return { board, checkWin, updateBoard, resetBoard, renderBoard };
}

// Create player
function Player(name) {
  let marker;

  // Place marker on the board with the appropriate colors and swap the active player indicator
  const playTurn = (td, plActive, plOther, playerActive, marker, board) => {
    playerActive = playerActive == 1 ? 2 : 1;
    plActive.classList.toggle("active");
    plOther.classList.toggle("active");

    board.updateBoard(+td.dataset.cell, marker);
    board.renderBoard(td, plActive, marker);
    board.checkWin(name, marker);

    turn++;

    // Return the new 'activePlayer' number so we can assign the value to the variable outside of the function
    return playerActive;
  };

  return { name, marker, playTurn };
}

function renderStyles(p1, p1Ind, p2, p2Ind, target) {
  p1.marker = target.classList.contains("fa-x") ? "X" : "O";
  p2.marker = p1.marker == "X" ? "O" : "X";

  p1Ind.style.color = p1.marker == "X" ? "red" : "green";
  p2Ind.style.color = p1.marker == "X" ? "green" : "red";

  p1Ind.textContent = `${p1.name} (${p1.marker})`;
  p2Ind.textContent = `${p2.name} (${p2.marker})`;
}

const gameBoard = createGameboard();

let player1 = Player("Monk");
let player2 = Player("Trolleg");

// Transition into 'select marker' screen
playGameBtn.addEventListener("click", () => {
  titleContainer.style.paddingTop = "0px";
  titleContainer.style.fontSize = "2rem";
  hlp.smoothFadeOut(startContainer, 0);
  hlp.smoothFadeIn(selectMarkerContainer, FADE_TIME, "flex");
});

// Select marker and transition into 'gameplay' screen, adjusting the colors, names etc.
selectMarkerContainer.addEventListener("click", function (e) {
  const target = e.target.closest("i");
  if (!target) return;

  renderStyles(player1, player1Indicator, player2, player2Indicator, target);

  hlp.smoothFadeOut(selectMarkerContainer, 0);
  hlp.smoothFadeIn(boardContainer, 0, "flex");
  hlp.smoothFadeIn(activePlayerIndic, 0, "flex");
});

// Gameplay
table.addEventListener("click", (e) => {
  const td = e.target.closest("td");
  if (!td) return;

  if (td.textContent == "" && activePlayer == 1 && !gameOver && turn < 9) {
    // Refer to function expression above. The line below displays the marker and the
    // appropriate colors in the board, while changing the active player indicator
    activePlayer = player1.playTurn(
      td,
      player1Indicator,
      player2Indicator,
      activePlayer,
      player1.marker,
      gameBoard
    );
  } else if (
    td.textContent == "" &&
    activePlayer == 2 &&
    !gameOver &&
    turn < 9
  ) {
    activePlayer = player2.playTurn(
      td,
      player2Indicator,
      player1Indicator,
      activePlayer,
      player2.marker,
      gameBoard
    );
  }
  if (turn == 9) {
    gameBoard.updateBoard(+td.dataset.cell, `player${activePlayer}.marker`);
    gameBoard.checkWin(
      `player${activePlayer}.name`,
      `player${activePlayer}.marker`
    );

    if (!gameOver) {
      hlp.smoothFadeOut(activePlayerIndic, FADE_TIME);
      hlp.smoothFadeIn(endgameContainer, FADE_TIME, "flex");
      endgameContainer.querySelector("h1").textContent = `It's a tie 👔`;
      gameOver = true;
    }
  }
});

replayBtn.addEventListener("click", function (e) {
  gameBoard.resetBoard();
  turn = 0;
  gameOver = false;
  activePlayer = 1;
  player1 = Player("Monk");
  player2 = Player("Trolleg");

  player1Indicator.classList.add("active");
  player2Indicator.classList.remove("active");

  hlp.smoothFadeOut(endgameContainer, 0);
  hlp.smoothFadeOut(boardContainer, 0);
  hlp.smoothFadeOut(activePlayerIndic, 0);
  hlp.smoothFadeIn(selectMarkerContainer, 0, "flex");
});
