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
      console.log("Invalid spot");
    }
  };

  // check if board is free
  const validMove = (row, column) => {
    return gameBoard[row][column] === "." ? true : false;
  };

  // loop through every row to check for a winner
  const checkColumn = (row, playerSymbol) => {
    let match = true;

    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[row][i] !== playerSymbol) {
        match = false;
      }
    }

    return match;
  };

  const checkRow = (column, playerSymbol) => {
    let match = true;

    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][column] !== playerSymbol) {
        match = false;
      }
    }

    return match;
  };

  // check 0 0 1 1 2 2
  // check 0 2 1 1 2 0
  const checkDiagonal = (playerSymbol) => {
    let match = true;

    // check left to right for x
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][i] !== playerSymbol) {
        match = false;
      }
    }

    if (match) {
      return match;
    }

    match = true;

    // if first diagonal is true ignore
    let column = gameBoard.length - 1;
    for (let i = 0; i < gameBoard.length; i++, column--) {
      if (gameBoard[i][column] !== playerSymbol) {
        match = false;
      }
    }

    return match;
  };

  const checkWinner = (playerSymbol) => {
    for (let i = 0; i < gameBoard.length; i++) {
      if (
        checkDiagonal(playerSymbol) ||
        checkColumn(i, playerSymbol) ||
        checkRow(i, playerSymbol)
      ) {
        console.log(playerSymbol + " Won");
        break;
      }
    }
  };

  const gameOver = () => {};

  return {
    gameBoard,
    setMove,
    checkWinner,
    checkColumn,
    checkDiagonal,
    checkRow,
  };
}

function createPlayer(name, symbol) {
  return { name, symbol };
}

let board = createGameBoard();

console.log(board.gameBoard);

let player1 = createPlayer("bob", "x");
let player2 = createPlayer("mario", "o");

board.setMove(0, 0, player1.symbol);
board.setMove(1, 1, player1.symbol);
board.setMove(2, 2, player1.symbol);

board.checkWinner(player1.symbol);
