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

export { checkWinOfGame };
