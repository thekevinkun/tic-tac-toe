import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, GameScore, SquareBox, AnnounceGame } from "../components";

import { resetGame } from "../redux/actions/playGameActions";
import { resetData, updateScore } from "../redux/actions/gameDataActions";

import { checkWinOfGame } from "../constants/helper";

import {
  hoverBoxAudio,
  pickPlayerAudio,
  clickGameBoardAudio,
  finishGameAudio,
  gameStartAudio,
  endGameAudio,
} from "../constants/audios";

const Board = ({
  board,
  clickedBox,
  playerNextTurn,
  playerOneSymbol,
  playerTwoSymbol,
  onGame,
}) => {
  const clickBoardAudioRef = useRef(null);

  const handleClickBoard = async (row, col, box) => {
    clickBoardAudioRef.current.play();

    const copyBoard = board.slice();
    const copyClickedBox = clickedBox.slice();

    if (copyBoard[row][col] === "") {
      if (playerNextTurn === 1) {
        copyClickedBox[box] = 1;
        copyBoard[row][col] = playerOneSymbol;
      } else if (playerNextTurn === 2) {
        copyClickedBox[box] = 2;
        copyBoard[row][col] = playerTwoSymbol;
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
              playerOneSymbol={playerOneSymbol}
              playerTwoSymbol={playerTwoSymbol}
              handleClickBoard={handleClickBoard}
            />
          );
        });
      })}

      <audio ref={clickBoardAudioRef} src={clickGameBoardAudio} />
    </div>
  );
};

const PlayGame = () => {
  const [isGamePlay, setIsGamePlay] = useState(true);

  const hoverBoxSoundRef = useRef(null);
  const pickPlayerSoundRef = useRef(null);
  const finishGameSoundRef = useRef(null);
  const gameStartSoundRef = useRef(null);
  const endGameSoundRef = useRef(null);

  const dispatch = useDispatch();

  // Get Player Information from redux store
  const { playerOneName, playerTwoName, playerOneScore, playerTwoScore } =
    useSelector((state) => state.data);

  // STATE: create 2d array
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ""))
  );

  const [clickedBox, setClickedBox] = useState(Array(9).fill(0));

  const [playerNextTurn, setPlayerNextTurn] = useState(1);
  const [playerOneSymbol, setPlayerOneSymbol] = useState("X");
  const [playerTwoSymbol, setPlayerTwoSymbol] = useState("O");

  const [isAnnounceGame, setIsAnnounceGame] = useState(-1);

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.play();
  };

  const switchPlayerSymbol = () => {
    let tempSymbol = playerOneSymbol;
    setPlayerOneSymbol(playerTwoSymbol);
    setPlayerTwoSymbol(tempSymbol);
  };

  const emptyBoard = () => {
    let copy_board = [...board];
    for (let i = 0; i < copy_board.length; i++) {
      for (let j = 0; j < copy_board[i].length; j++) {
        copy_board[i][j] = "";
        setBoard(copy_board);
      }
    }

    let copy_clicked_box = [...clickedBox];
    for (let i = 0; i < copy_clicked_box.length; i++) {
      copy_clicked_box[i] = 0;
      setClickedBox(copy_clicked_box);
    }
  };

  const handlePlayAgain = () => {
    pickPlayerSoundRef.current.play();

    dispatch(resetData());
    dispatch(resetGame());
  };

  const handleEndGame = () => {
    // Reset game
    endGameSoundRef.current.play();

    setIsGamePlay(false);

    setIsAnnounceGame(-1);
  };

  const handleContinueGame = () => {
    // Empty board state array, for evaluation
    emptyBoard();

    /* 
        This for handling which player should start first 
        After switch symbol, player who play X is always play first, whoever the winner
        IF player one is X, it will switch the symbol to player two, means set the setPlayerNextTurn to player two(2), so p2 will play first
        BUT IF player two is X, it will switch the symbol to player one, means set the setPlayerNextTurn to player one(1), so p1 will play first
    */
    if (playerOneSymbol === "X") {
      setPlayerNextTurn(2);
    } else if (playerTwoSymbol === "X") {
      setPlayerNextTurn(1);
    }

    // Switch player symbol for each new game
    switchPlayerSymbol();

    // Play start game sound
    gameStartSoundRef.current.play();

    // Reset game
    setIsAnnounceGame(-1);
  };

  const updateGameScore = (winner) => {
    if (winner === 1) {
      if (playerOneSymbol === "X")
        dispatch(
          updateScore({
            playerOneScore: playerOneScore + 1,
            playerTwoScore: playerTwoScore,
          })
        );
      else
        dispatch(
          updateScore({
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore + 1,
          })
        );
    } else if (winner === 2) {
      if (playerTwoSymbol === "O")
        dispatch(
          updateScore({
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore + 1,
          })
        );
      else
        dispatch(
          updateScore({
            playerOneScore: playerOneScore + 1,
            playerTwoScore: playerTwoScore,
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
        finishGameSoundRef.current.play();
        setIsAnnounceGame(isGetWinner);
      }, 500);
    } else if (isGetWinner === -1) {
      setPlayerNextTurn(playerNextTurn === 1 ? 2 : 1);
    }
  };

  return (
    <div>
      <div
        className={`${!isGamePlay && "pointer-events-none"}
        fade-in flex flex-col items-center justify-center`}
      >
        <div className="mt-8 max-sm:mt-0">
          <Board
            board={board}
            clickedBox={clickedBox}
            playerNextTurn={playerNextTurn}
            playerOneSymbol={playerOneSymbol}
            playerTwoSymbol={playerTwoSymbol}
            onGame={handleGame}
          />
        </div>

        <div className="mt-14">
          <GameScore
            isGamePlay={isGamePlay}
            playerOneName={playerOneName}
            playerTwoName={playerTwoName}
            playerOneSymbol={playerOneSymbol}
            playerTwoSymbol={playerTwoSymbol}
            playerOneScore={playerOneScore}
            playerTwoScore={playerTwoScore}
            playerNextTurn={playerNextTurn}
          />
        </div>

        {isAnnounceGame > -1 && (
          <AnnounceGame
            winner={isAnnounceGame}
            playerOneName={playerOneName}
            playerTwoName={playerTwoName}
            playerOneSymbol={playerOneSymbol}
            playerTwoSymbol={playerTwoSymbol}
            onContinue={handleContinueGame}
            onEnd={handleEndGame}
          />
        )}
      </div>

      {!isGamePlay && (
        <div className="absolute bottom-5 right-5">
          <Button
            id="restart"
            className="py-3 px-5 bg-blood-red/80 hover:bg-blood-red/100 !rounded-md transition-[background-color] duration-300"
            subClassName="text-[0.675rem]"
            onClick={handlePlayAgain}
            onHover={handlePlaySoundOnHover}
          >
            Play again
          </Button>
        </div>
      )}

      <audio ref={hoverBoxSoundRef} src={hoverBoxAudio} />
      <audio ref={pickPlayerSoundRef} src={pickPlayerAudio} />
      <audio ref={finishGameSoundRef} src={finishGameAudio} />
      <audio ref={gameStartSoundRef} src={gameStartAudio} />
      <audio ref={endGameSoundRef} src={endGameAudio} />
    </div>
  );
};

export default PlayGame;
