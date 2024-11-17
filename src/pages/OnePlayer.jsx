import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, NotificationGame } from "../components";

import { isGamePlay } from "../redux/actions/playGameActions";
import { playComputer } from "../redux/actions/gameDataActions";

import {
  hoverBoxAudio,
  pickPlayerAudio,
  gameStartAudio,
  errorAudio,
} from "../constants/audios";

const createLevel = (n, pickLevel, handlePickLevel, handlePlaySoundOnHover) => {
  const rows = [];

  for (let i = 0; i < n; i++) {
    rows.push(
      <Button
        key={i + 1}
        id={i === 0 ? "easy" : i === 1 ? "medium" : "hard"}
        className={`${
          pickLevel === i + 1
            ? "scale-110 border-4 border-blood-red pointer-events-none"
            : ""
        }
            py-10 px-4 max-[480px]:px-3 max-[375px]:py-8 max-[375px]:px-2 bg-matte-black/75 
            hover:bg-matte-black/100 hover:scale-110 transition-[background-color,transform,opacity] duration-700`}
        subClassName="text-level pointer-events-none"
        onClick={() => handlePickLevel(i + 1)}
        onHover={handlePlaySoundOnHover}
      >
        {i === 0 ? "Easy" : i === 1 ? "Medium" : "Hard"}
      </Button>
    );
  }

  return rows;
};

const handleGameMode = () => {
  let inputName = document.getElementById("input-name");
  let levelGameButton = document.getElementById("level-game");
  let startGameButton = document.getElementById("start-game");

  return new Promise((resolve, reject) => {
    inputName.style.opacity = 0;
    levelGameButton.style.opacity = 0;
    startGameButton.style.opacity = 0;
    setTimeout(() => {
      resolve();
    }, 1500);
  });
};

const OnePlayer = () => {
  document.title = "Tic Tac Toe | vs Computer";

  const [pickLevel, setPickLevel] = useState(null);
  const [queryName, setQueryName] = useState("");

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

  const handlePickLevel = (lvl) => {
    pickPlayerSoundRef.current.play();
    setPickLevel(lvl);
  };

  const handleStartGame = async () => {
    if (!pickLevel) {
      errorSoundRef.current.play();
      setShowNotification(true);
      return;
    } else if (!queryName) {
      errorSoundRef.current.play();
      setShowNotification(true);
      return;
    }

    const level =
      pickLevel === 1 ? "easy" : pickLevel === 2 ? "medium" : "hard";

    await setStopPlay(true);
    await gameStartSoundRef.current.play();

    await handleGameMode()
      .then(() => dispatch(isGamePlay()))
      .then(() =>
        dispatch(playComputer({ level: level, playerOne: queryName }))
      )
      .then(() => navigate("play"));
  };

  return (
    <div className="fade-in flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div
          id="level-game"
          className={`${stopPlay && "pointer-events-none"}
            flex items-center justify-center gap-6 max-[480px]:gap-3 max-[375px]:gap-2 transition-opacity duration-1000`}
        >
          {createLevel(3, pickLevel, handlePickLevel, handlePlaySoundOnHover)}
        </div>

        <input
          id="input-name"
          type="text"
          placeholder="Name..."
          className="input mt-16 max-[480px]:mt-14 max-[375px]:mt-10 transition-opacity duration-1000"
          autoComplete="off"
          onChange={({ target }) => setQueryName(target.value)}
        />

        <Button
          id="start-game"
          className={`${stopPlay && "pointer-events-none"}
            w-fit mt-10 max-[480px]:mt-8 max-[375px]:mt-7 py-4 px-4 max-[375px]:px-3 !rounded-md 
            bg-blood-red/75 hover:bg-blood-red/100 hover:scale-110 transition-[background-color,transform,opacity] duration-1000`}
          subClassName="text-bone-white text-[0.675rem] max-[480px]:text-[0.625rem] max-[375px]:text-[0.55rem] pointer-events-none"
          onClick={() => handleStartGame()}
          onHover={handlePlaySoundOnHover}
        >
          Start Game
        </Button>
      </div>

      {showNotification && (
        <NotificationGame
          level={pickLevel}
          queryFirstName={queryName}
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

export default OnePlayer;
