function createGameBoard() {
  let gameBoard = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];

  const setMove = (row, column, symbol) => {
    if (validMove(row, column)) {
      gameBoard[row][column] = symbol;
    } else {
      console.log("Invalid move");
    }
  };

  // check if board is free
  const validMove = (row, column) => {
    return gameBoard[row][column] === "." ? true : false;
  };

  const gameOver = () => {};

  return { gameBoard, setMove };
}

function createPlayer(name, symbol) {
  return { name, symbol };
}

let board = createGameBoard();

console.log(board.gameBoard);

let player1 = createPlayer("bob", "x");
let player2 = createPlayer("mario", "o");

board.setMove(1, 1, player1.symbol);
board.setMove(2, 2, player2.symbol);
board.setMove(2, 2, player1.symbol);
board.setMove(1, 2, player2.symbol);
board.setMove(0, 2, player2.symbol);
