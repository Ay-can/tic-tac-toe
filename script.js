function createGameBoard() {
  let gameBoard = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  const setMove = (row, column, symbol) => {
    if (validMove(row, column)) {
      gameBoard[row][column] = symbol;
    } else {
      console.log("Spot already taken");
    }
  };

  // check if board is free
  const validMove = (row, column) => {
    return gameBoard[row][column] === "." ? true : false;
  };

  // loop through every row to check for a winner
  const checkColumn = (row) => {
    for (let i = 0; i < gameBoard.length; i++) {
      console.log(gameBoard[row][i]);
    }
  };

  const checkRow = (column) => {
    for (let i = 0; i < gameBoard.length; i++) {
      console.log(gameBoard[i][column]);
    }
  };

  const gameOver = () => {};

  return { gameBoard, setMove, checkColumn, checkRow };
}

function createPlayer(name, symbol) {
  return { name, symbol };
}

let board = createGameBoard();

//board.checkColumn(1);
board.checkRow(1);

console.log(board.gameBoard);

let player1 = createPlayer("bob", "x");
let player2 = createPlayer("mario", "o");

board.setMove(1, 1, player1.symbol);
board.setMove(2, 2, player2.symbol);
board.setMove(2, 2, player1.symbol);
board.setMove(1, 2, player2.symbol);
board.setMove(0, 2, player2.symbol);
