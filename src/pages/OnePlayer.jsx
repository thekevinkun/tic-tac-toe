import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

import { hoverBoxAudio, gameStartAudio, errorAudio } from "../constants/audios";

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
            py-10 px-4 max-[480px]:px-3 max-[375px]:py-8 max-[375px]:px-2 bg-btn-color/75 
            hover:bg-btn-color/100 hover:scale-110 transition-[background-color,transform,opacity] duration-700`}
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
  const [pickLevel, setPickLevel] = useState(null);
  const [queryName, setQueryName] = useState("");

  const hoverBoxSoundRef = useRef(null);
  const gameStartSoundRef = useRef(null);
  const errorSoundRef = useRef(null);

  const navigate = useNavigate();

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.play();
  };

  const handlePickLevel = (lvl) => {
    setPickLevel(lvl);
  };

  const handleStartGame = async () => {
    if (!pickLevel) {
      errorSoundRef.current.play();
      alert("Please pick your level!");
      return;
    } else if (!queryName) {
      errorSoundRef.current.play();
      alert("Please enter your name!");
      return;
    }

    await gameStartSoundRef.current.play();
    await handleGameMode().then(() => navigate("/play"));
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col items-center">
        <div
          id="level-game"
          className="flex items-center justify-center gap-6 max-[480px]:gap-3 max-[375px]:gap-2 transition-opacity duration-1000"
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
          className="w-fit mt-10 max-[375px]:mt-8 py-4 px-4 !rounded-lg bg-btn-color/75 hover:bg-btn-color/100 hover:scale-110 
            transition-[background-color,transform,opacity] duration-1000"
          subClassName="text-bone-white text-[0.675rem] max-[375px]:text-[0.6rem] pointer-events-none"
          onClick={() => handleStartGame()}
          onHover={handlePlaySoundOnHover}
        >
          Start Game
        </Button>
      </div>

      <audio ref={hoverBoxSoundRef} src={hoverBoxAudio} />
      <audio ref={gameStartSoundRef} src={gameStartAudio} />
      <audio ref={errorSoundRef} src={errorAudio} />
    </div>
  );
};

export default OnePlayer;
