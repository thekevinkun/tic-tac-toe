import { preMinimax } from "./minimax";

const checkEachRows = (
  checkCrossRows,
  checkCircleRows,
  checkCrossColumns,
  checkCircleColumns,
  checkCrossLeftDiagonal,
  checkCirlceLeftDiagonal,
  checkCrossRightDiagonal,
  checkCircleRightDiagonal
) => {
  if (
    checkCrossRows.length === 3 ||
    checkCrossColumns.length === 3 ||
    checkCrossLeftDiagonal.length === 3 ||
    checkCrossRightDiagonal.length === 3
  ) {
    return 1;
  } else if (
    checkCircleRows.length === 3 ||
    checkCircleColumns.length === 3 ||
    checkCirlceLeftDiagonal.length === 3 ||
    checkCircleRightDiagonal.length === 3
  ) {
    return 2;
  }

  return 0;
};

const checkWinOfGame = (arr) => {
  // CHECK THE SYMBOL PATTERN IN THE ARRAY, TO FIND THE WINNER
  let crossReg = /X/g;
  let circleReg = /O/g;
  let emptyReg = /^$/;
  let checkCrossRows = [],
    checkCircleRows = [],
    checkCrossColumns = [],
    checkCircleColumns = [],
    checkCrossLeftDiagonal = [],
    checkCirlceLeftDiagonal = [],
    checkCrossRightDiagonal = [],
    checkCircleRightDiagonal = [],
    checkFullBoard = [];

  for (let i = 0; i < arr.length; i++) {
    checkCrossRows = arr[i].filter((item) => item.match(crossReg));
    checkCircleRows = arr[i].filter((item) => item.match(circleReg));

    checkCrossColumns = arr
      .map((item) => item[i])
      .filter((item) => item.match(crossReg));
    checkCircleColumns = arr
      .map((item) => item[i])
      .filter((item) => item.match(circleReg));

    checkCrossLeftDiagonal = arr
      .map((row, i, all) => row[i])
      .filter((item) => item.match(crossReg));
    checkCirlceLeftDiagonal = arr
      .map((row, i, all) => row[i])
      .filter((item) => item.match(circleReg));

    checkCrossRightDiagonal = arr
      .map((row, i, all) => row[all.length - 1 - i])
      .filter((item) => item.match(crossReg));
    checkCircleRightDiagonal = arr
      .map((row, i, all) => row[all.length - 1 - i])
      .filter((item) => item.match(circleReg));

    if (checkFullBoard.indexOf("") === -1) {
      checkFullBoard = arr[i].filter((item) => item.match(emptyReg));
    }

    let result = checkEachRows(
      checkCrossRows,
      checkCircleRows,
      checkCrossColumns,
      checkCircleColumns,
      checkCrossLeftDiagonal,
      checkCirlceLeftDiagonal,
      checkCrossRightDiagonal,
      checkCircleRightDiagonal
    );

    if (result === 1) {
      return 1;
    } else if (result === 2) {
      return 2;
    }
  }

  if (checkFullBoard.length === 0) {
    return 0;
  }
  return -1;
};

const playComputerLevelEasy = (copyBoard) => {
  let isStillCalculate = true;
  let randomRow = 0;
  let randomCol = 0;

  do {
    randomRow = Math.floor(Math.random() * 3);
    randomCol = Math.floor(Math.random() * 3);

    if (copyBoard[randomRow][randomCol] === "") {
      isStillCalculate = false;
    }
  } while (isStillCalculate);

  return { row: randomRow, col: randomCol };
};

const playComputerLevelMedium = (
  copyBoard,
  playerOneSymbol,
  playerTwoSymbol
) => {
  let bestRow = 0;
  let bestCol = 0;
  let score = 0;
  let bestScore = -Infinity;

  for (let i = 0; i < copyBoard.length; i++) {
    for (let j = 0; j < copyBoard[i].length; j++) {
      if (copyBoard[i][j] === "") {
        copyBoard[i][j] = playerTwoSymbol;
        score = preMinimax(
          playerOneSymbol,
          playerTwoSymbol,
          copyBoard,
          -1,
          false
        );

        copyBoard[i][j] = "";

        if (score > bestScore) {
          bestScore = score;
          bestRow = i;
          bestCol = j;
        }
      }
    }
  }

  return { row: bestRow, col: bestCol };
};

const playComputerLevelHard = (copyBoard, playerOneSymbol, playerTwoSymbol) => {
  let bestRow = 0;
  let bestCol = 0;
  let score = 0;
  let bestScore = -Infinity;

  for (let i = 0; i < copyBoard.length; i++) {
    for (let j = 0; j < copyBoard[i].length; j++) {
      if (copyBoard[i][j] === "") {
        copyBoard[i][j] = playerTwoSymbol;
        score = preMinimax(
          playerOneSymbol,
          playerTwoSymbol,
          copyBoard,
          0,
          false
        );

        copyBoard[i][j] = "";

        if (score > bestScore) {
          bestScore = score;
          bestRow = i;
          bestCol = j;
        }
      }
    }
  }

  return { row: bestRow, col: bestCol };
};

export {
  checkWinOfGame,
  playComputerLevelEasy,
  playComputerLevelMedium,
  playComputerLevelHard,
};
