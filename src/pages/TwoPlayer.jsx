import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, NotificationGame } from "../components";

import { isGamePlay } from "../redux/actions/playGameActions";
import { playTwoPlayer } from "../redux/actions/gameDataActions";

import {
  hoverBoxAudio,
  pickPlayerAudio,
  gameStartAudio,
  errorAudio,
} from "../constants/audios";

const handleGameMode = () => {
  let inputNameOne = document.getElementById("input-name-1");
  let inputNameTwo = document.getElementById("input-name-2");
  let startGameButton = document.getElementById("start-game");

  return new Promise((resolve, reject) => {
    inputNameOne.style.opacity = 0;
    inputNameTwo.style.opacity = 0;
    startGameButton.style.opacity = 0;
    setTimeout(() => {
      resolve();
    }, 1500);
  });
};

const TwoPlayer = () => {
  const [queryFirstName, setQueryFirstName] = useState("");
  const [querySecondName, setQuerySecondName] = useState("");

  const hoverBoxSoundRef = useRef(null);
  const pickPlayerSoundRef = useRef(null);
  const gameStartSoundRef = useRef(null);
  const errorSoundRef = useRef(null);

  const [stopPlay, setStopPlay] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.play();
  };

  const handleCloseNotification = () => {
    pickPlayerSoundRef.current.play();
    setShowNotification(false);
  };

  const handleStartGame = async () => {
    if (!queryFirstName) {
      errorSoundRef.current.play();
      setShowNotification(true);
      return;
    } else if (!querySecondName) {
      errorSoundRef.current.play();
      setShowNotification(true);
      return;
    }

    await setStopPlay(true);
    await gameStartSoundRef.current.play();
    await handleGameMode()
      .then(() => dispatch(isGamePlay()))
      .then(() =>
        dispatch(
          playTwoPlayer({
            playerOne: queryFirstName,
            playerTwo: querySecondName,
          })
        )
      )
      .then(() => navigate("/play"));
  };

  return (
    <div className="fade-in flex items-center justify-center">
      <div className="flex flex-col items-center">
        <input
          id="input-name-1"
          type="text"
          placeholder="Player 1 Name..."
          className="input max-[375px]:!text-[0.6rem] transition-opacity duration-1000"
          autoComplete="off"
          onChange={({ target }) => setQueryFirstName(target.value)}
        />

        <input
          id="input-name-2"
          type="text"
          placeholder="Player 2 Name..."
          className="input mt-5 max-[375px]:!text-[0.6rem] transition-opacity duration-1000"
          autoComplete="off"
          onChange={({ target }) => setQuerySecondName(target.value)}
        />

        <Button
          id="start-game"
          className={`${stopPlay && "pointer-events-none"}
              w-fit mt-11 max-[480px]:mt-10 max-[375px]:mt-8 py-5 px-4 max-[480px]:py-4 max-[375px]:py-3 max-[375px]:px-3 !rounded-md 
              bg-blood-red/75 hover:bg-blood-red/100 hover:scale-110 transition-[background-color,transform,opacity] duration-1000`}
          subClassName="text-xs max-[480px]:text-[0.65rem] max-[375px]:text-[0.575rem] pointer-events-none"
          onClick={() => handleStartGame()}
          onHover={handlePlaySoundOnHover}
        >
          Start Game
        </Button>
      </div>

      {showNotification && (
        <NotificationGame
          queryFirstName={queryFirstName}
          querySecondName={querySecondName}
          onClick={handleCloseNotification}
        />
      )}

      {showNotification && (
        <div className="w-full h-full absolute top-0 left-0 z-40 bg-matte-black/35"></div>
      )}

      <audio ref={hoverBoxSoundRef} src={hoverBoxAudio} />
      <audio ref={pickPlayerSoundRef} src={pickPlayerAudio} />
      <audio ref={gameStartSoundRef} src={gameStartAudio} />
      <audio ref={errorSoundRef} src={errorAudio} />
    </div>
  );
};

export default TwoPlayer;
