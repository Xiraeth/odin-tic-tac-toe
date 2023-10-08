"use strict";

const playGameBtn = document.querySelector(".play-game");

playGameBtn.addEventListener("click", () => {
  // Screen transition to game
});

const Gameboard = function () {
  const player1 = "Player 1";
  const player2 = "Player 2";

  const board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return { player1, player2, board };
};

const Updateboard = function () {};
