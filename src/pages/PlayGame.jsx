import { useState } from "react";
import { useSelector } from "react-redux";

import { FaX, FaCircle } from "react-icons/fa6";

const SymbolOnBoard = ({ clickedBox }) => {
  return (
    <div className="symbol-on-board">
      {clickedBox[i] === 1 && playerOneSymbol === "X" ? (
        <FaX />
      ) : clickedBox[i] === 1 && playerOneSymbol === "O" ? (
        <FaCircle />
      ) : clickedBox[i] === 2 && playerTwoSymbol === "X" ? (
        <FaX />
      ) : clickedBox[i] === 2 && playerTwoSymbol === "O" ? (
        <FaCircle />
      ) : (
        ""
      )}
    </div>
  );
};

const Board = ({ board, clickedBox, onClick }) => {
  let i = 0;
  return board.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      i++;
      return (
        <button
          key={"box-" + i}
          id={i}
          row={rowIndex}
          col={colIndex}
          className="game-box"
          onClick={onClick}
        >
          ""
        </button>
      );
    });
  });
};

const GameScore = () => {
  const { playerOneName, playerTwoName, playerOneScore, playerTwoScore } =
    useSelector((state) => state.data);

  return (
    <div className="flex items-center justify-center gap-5 max-[375px]:gap-3">
      <div className="flex items-center gap-11 max-[480px]:gap-7 max-[375px]:gap-5">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-sm max-sm:text-xs max-[480px]:text-[0.6rem] max-[375px]:text-[0.575rem]">
            (X)
          </p>
          <p className="max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]">
            {playerOneName}
          </p>
        </div>

        <div>
          <p className="max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]">
            {playerOneScore}
          </p>
        </div>
      </div>

      <p className="max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]">
        vs
      </p>

      <div className="flex items-center gap-11 max-[480px]:gap-7 max-[375px]:gap-5">
        <div>
          <p className="max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]">
            {playerTwoScore}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-sm max-sm:text-xs max-[480px]:text-[0.6rem] max-[375px]:text-[0.575rem]">
            (O)
          </p>
          <p className="max-sm:text-sm max-[480px]:text-xs  max-[375px]:text-[0.625rem]">
            {playerTwoName}
          </p>
        </div>
      </div>
    </div>
  );
};

const PlayGame = () => {
  // STATE: create 2d array
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ""))
  );

  // STATE: As a state for each box to know which icon to show
  const [clickedBox, setClickedBox] = useState(Array(9).fill(0));

  const handleGame = (e) => {};

  return (
    <div className="fade-in mt-8 max-sm:mt-0 flex flex-col items-center justify-center">
      <div className="grid grid-cols-3">
        <Board
          board={board}
          clickedBox={clickedBox}
          onClick={(e) => handleGame(e)}
        />
      </div>

      <div className="mt-14">
        <GameScore />
      </div>
    </div>
  );
};

export default PlayGame;
