const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const setMove = (row, column, symbol) => {
    if (validMove(row, column)) {
      board[row][column] = symbol;
    } else {
      console.log("Invalid spot");
    }
  };

  // check if board is free
  const validMove = (row, column) => {
    return board[row][column] === "" ? true : false;
  };

  // loop through every row to check for a winner
  const checkColumn = (row, playerSymbol) => {
    let match = true;

    for (let i = 0; i < board.length; i++) {
      if (board[row][i] !== playerSymbol) {
        match = false;
      }
    }

    return match;
  };

  const checkRow = (column, playerSymbol) => {
    let match = true;

    for (let i = 0; i < board.length; i++) {
      if (board[i][column] !== playerSymbol) {
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
    for (let i = 0; i < board.length; i++) {
      if (board[i][i] !== playerSymbol) {
        match = false;
      }
    }

    if (match) {
      return match;
    }

    match = true;

    // if first diagonal is true ignore
    let column = board.length - 1;
    for (let i = 0; i < board.length; i++, column--) {
      if (board[i][column] !== playerSymbol) {
        match = false;
      }
    }

    return match;
  };

  const checkWinner = (symbol) => {
    for (let i = 0; i < board.length; i++) {
      if (
        checkDiagonal(symbol) ||
        checkColumn(i, symbol) ||
        checkRow(i, symbol)
      ) {
        return { symbol, status: "won" };
      }
    }
    return { symbol, status: "lost" };
  };

  const gameOver = (playerOne, playerTwo) => {
    if (playerOne.status === "lost" && playerOne.status === "lost") {
      console.log("Draw! -> No winner!");
    } else if (playerOne.status === "won") {
      console.log(`${playerOne.symbol} won!`);
      console.log(`${playerTwo.symbol} lost!`);
    } else if (playerTwo.status === "won") {
      console.log(`${playerTwo.symbol} won!`);
      console.log(`${playerOne.symbol} lost!`);
    }
  };

  return {
    board,
    setMove,
    checkWinner,
    gameOver,
  };
})();

function createPlayer(name, symbol) {
  return { name, symbol };
}

const displayController = (function () {
  const fillDomBoard = () => {
    const domBoard = document.querySelectorAll(".cell");
    const flatBoard = gameBoard.board.flat();

    for (let i = 0; i < 9; i++) {
      domBoard[i].innerText = flatBoard[i];
    }
  };

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.addEventListener("click", (e) => {
      const getTargetClassList = e.target.classList;

      // set attribute with row index for board
      if (getTargetClassList.contains("top-row")) {
        e.target.dataset.rowIndex = 0;
      } else if (getTargetClassList.contains("middle-row")) {
        e.target.dataset.rowIndex = 1;
      } else {
        e.target.dataset.rowIndex = 2;
      }

      // set column index
      e.target.dataset.columnIndex = index;
    });
  });

  return { fillDomBoard };
})();

displayController.fillDomBoard();
