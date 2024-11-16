let board = [];
let g_PlayerOneSymbol = "";
let g_PlayerTwoSymbol = "";

const checkEachRows = (checkCrossRows, checkCircleRows, checkCrossColumns, checkCircleColumns, checkCrossLeftDiagonal, 
    checkCirlceLeftDiagonal, checkCrossRightDiagonal, checkCircleRightDiagonal) => {
    
    if (checkCrossRows.length === 3 || checkCrossColumns.length === 3 || 
        checkCrossLeftDiagonal.length === 3 || checkCrossRightDiagonal.length === 3) {
        if (g_PlayerOneSymbol === 'X') {
            return -1;
        } else {
            return 1;
        }
    } else if (checkCircleRows.length === 3 || checkCircleColumns.length === 3 || 
        checkCirlceLeftDiagonal.length === 3 || checkCircleRightDiagonal.length === 3) {
        if (g_PlayerOneSymbol === 'X') {
            return 1;
        } else {
            return -1;
        }
    } 

    return 0;
}

const checkMinimaxWin = () => {
    // CHECK THE SYMBOL PATTERN IN THE boardAY, TO FIND THE WINNER
    let crossReg = /X/g;
    let circleReg = /O/g;
    let emptyReg = /^$/;
    let checkCrossRows = [], checkCircleRows = [], checkCrossColumns = [], 
        checkCircleColumns = [], checkCrossLeftDiagonal = [], checkCirlceLeftDiagonal = [],
        checkCrossRightDiagonal = [], checkCircleRightDiagonal = [], checkFullBoard = [];

    for (let i = 0; i < board.length; i++) {
        checkCrossRows = board[i].filter(item => item.match(crossReg));
        checkCircleRows = board[i].filter(item => item.match(circleReg));

        checkCrossColumns = board.map(item => item[i]).filter(item => item.match(crossReg));
        checkCircleColumns = board.map(item => item[i]).filter(item => item.match(circleReg));
        
        checkCrossLeftDiagonal = board.map((row, i, all) => row[i]).filter(item => item.match(crossReg));
        checkCirlceLeftDiagonal = board.map((row, i, all) => row[i]).filter(item => item.match(circleReg));
        
        checkCrossRightDiagonal = board.map((row, i, all) => row[all.length - 1 - i]).filter(item => item.match(crossReg));;
        checkCircleRightDiagonal = board.map((row, i, all) => row[all.length - 1 - i]).filter(item => item.match(circleReg));;
        
        if (checkFullBoard.indexOf("") === -1) {
            checkFullBoard = board[i].filter(item => item.match(emptyReg));
        }    

        let result = checkEachRows(checkCrossRows, checkCircleRows, checkCrossColumns, checkCircleColumns, checkCrossLeftDiagonal, 
            checkCirlceLeftDiagonal, checkCrossRightDiagonal, checkCircleRightDiagonal);
        
        if (result === 1) {
            return 1;
        } else if (result === -1) {
            return -1;
        }
    }
    
    if (checkFullBoard.length === 0) {
        return 0;
    }
    return 2;
}

const minimax = (depth, isMaximizing) => {
    let result = checkMinimaxWin();
    if (result !== 2) {
        return result;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === "") {
                    board[i][j] = g_PlayerTwoSymbol;
                    let score = minimax(depth + 1, false);
                    board[i][j] = "";

                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === "") {
                    board[i][j] = g_PlayerOneSymbol;
                    let score = minimax(depth + 1, true);
                    board[i][j] = "";

                    if (score < bestScore) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    }
}

export const preMinimax = (playerOneSym, playerTwoSym, copy_board, depth, status) => {
    g_PlayerOneSymbol = playerOneSym;
    g_PlayerTwoSymbol = playerTwoSym;
    board = [...copy_board];

    return minimax(depth, status);
}