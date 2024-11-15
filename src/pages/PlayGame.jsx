import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GameScore, SquareBox } from "../components";

import { updateScore } from "../redux/actions/gameDataActions";

import { checkWinOfGame } from "../constants/helper";

const Board = ({ board, clickedBox, playerNextTurn, onGame }) => {
  // STATE: As a state for each box to know which icon to show

  const handleClickBoard = async (row, col, box) => {
    const copyBoard = board.slice();
    const copyClickedBox = clickedBox.slice();

    if (copyBoard[row][col] === "") {
      if (playerNextTurn === 1) {
        copyClickedBox[box] = 1;
        copyBoard[row][col] = "X";
      } else if (playerNextTurn === 2) {
        copyClickedBox[box] = 2;
        copyBoard[row][col] = "O";
      }

      onGame(copyBoard, copyClickedBox);
    }
  };

  let i = 0;

  return (
    <div className="grid grid-cols-3">
      {board.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          i++;
          return (
            <SquareBox
              key={"box-" + i}
              id={"box-" + i}
              row={rowIndex}
              col={colIndex}
              box={i - 1}
              className="game-box"
              value={clickedBox[i - 1]}
              handleClickBoard={handleClickBoard}
            />
          );
        });
      })}
    </div>
  );
};

const PlayGame = () => {
  const dispatch = useDispatch();

  // Get Player Information from redux store
  const { mode } = useSelector((state) => state.game);
  const { playerOneName, playerTwoName, playerOneScore, playerTwoScore } =
    useSelector((state) => state.data);

  // STATE: create 2d array
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ""))
  );

  const [clickedBox, setClickedBox] = useState(Array(9).fill(0));
  const [playerNextTurn, setPlayerNextTurn] = useState(1);

  const announceEndGame = (winner) => {
    if (winner === 1) {
      alert("Player 1 Won!");
      return;
    }

    if (mode === "computer" && winner === 2) {
      alert("Computer Won!");
      return;
    }

    if (mode === "two player" && winner === 2) {
      alert("Player 2 Won!");
      return;
    }
  };

  const updateGameScore = (winner) => {
    if (winner === 1) {
      dispatch(
        updateScore({
          playerOneScore: playerOneScore + 1,
          playerTwoScore: playerTwoScore,
        })
      );
    } else if (winner === 2) {
      dispatch(
        updateScore({
          playerOneScore: playerOneScore,
          playerTwoScore: playerTwoScore + 1,
        })
      );
    }
  };

  const handleGame = (copyBoard, copyClickedBox) => {
    setClickedBox(copyClickedBox);
    setBoard(copyBoard);

    const isGetWinner = checkWinOfGame(copyBoard);

    if (isGetWinner === 0 || isGetWinner === 1 || isGetWinner === 2) {
      updateGameScore(isGetWinner);

      setTimeout(() => {
        announceEndGame(isGetWinner);
      }, 1500);
    } else if (isGetWinner === -1) {
      setPlayerNextTurn(playerNextTurn === 1 ? 2 : 1);
    }
  };

  return (
    <div className="fade-in mt-8 max-sm:mt-0 flex flex-col items-center justify-center">
      <Board
        board={board}
        clickedBox={clickedBox}
        playerNextTurn={playerNextTurn}
        onGame={handleGame}
      />

      <div className="mt-14">
        <GameScore
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          playerOneScore={playerOneScore}
          playerTwoScore={playerTwoScore}
          playerNextTurn={playerNextTurn}
        />
      </div>
    </div>
  );
};

export default PlayGame;
