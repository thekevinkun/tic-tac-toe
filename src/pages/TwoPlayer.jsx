import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

import { hoverBoxAudio, gameStartAudio, errorAudio } from "../constants/audios";

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
  const gameStartSoundRef = useRef(null);
  const errorSoundRef = useRef(null);

  const navigate = useNavigate();

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.play();
  };

  const handleStartGame = async () => {
    if (!queryFirstName) {
      errorSoundRef.current.play();
      alert("Please enter Player One Name!");
      return;
    } else if (!querySecondName) {
      errorSoundRef.current.play();
      alert("Please enter Player Two Name!");
      return;
    }

    await gameStartSoundRef.current.play();
    await handleGameMode().then(() => navigate("/play"));
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col items-center">
        <input
          id="input-name-1"
          type="text"
          placeholder="Player 1 Name..."
          className="input !text-xs max-[480px]:!text-[0.7rem] max-[480px]:!text-[0.6rem] transition-opacity duration-1000"
          autoComplete="off"
          onChange={({ target }) => setQueryFirstName(target.value)}
        />

        <input
          id="input-name-2"
          type="text"
          placeholder="Player 2 Name..."
          className="input mt-5 !text-xs max-[480px]:!text-[0.7rem] max-[480px]:!text-[0.6rem] transition-opacity duration-1000"
          autoComplete="off"
          onChange={({ target }) => setQuerySecondName(target.value)}
        />

        <Button
          id="start-game"
          className="w-fit mt-11 max-[375px]:mt-8 py-4 px-4 !rounded-lg bg-btn-color/75 hover:bg-btn-color/100 hover:scale-110 
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

export default TwoPlayer;
