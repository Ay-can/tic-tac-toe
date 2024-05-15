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
        return true;
      }
    }
  };

  const gameOver = (winner) => {
    console.log(winner.name + " wins!");
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
  const playerOne = createPlayer("bob", "x");
  const playerTwo = createPlayer("john", "o");

  // start with player one
  let turn = playerOne;

  const toggleTurn = () =>
    turn === playerOne ? (turn = playerTwo) : (turn = playerOne);

  const fillDomBoard = () => {
    const domBoard = document.querySelectorAll(".cell");
    const flatBoard = gameBoard.board.flat();

    for (let i = 0; i < 9; i++) {
      domBoard[i].innerText = flatBoard[i];
    }
  };

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.target.innerText = turn.symbol;
      const row = e.target.dataset.row;
      const column = e.target.dataset.column;

      gameBoard.board[row][column] = turn.symbol;

      // check winner
      if (gameBoard.checkWinner(turn.symbol)) {
        gameBoard.gameOver(turn);
      }

      // change turn
      toggleTurn();

      console.log(gameBoard.board);
    });
  });

  return { fillDomBoard };
})();

displayController.fillDomBoard();
