import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components";

import { hoverBoxAudio, pickPlayerAudio } from "../constants/audios";

import { FaRobot } from "react-icons/fa";
import { GiPlayerNext } from "react-icons/gi";

var interval;

const blink = (target) => {
  target.style.visibility =
    target.style.visibility === "hidden" ? "visible" : "hidden";
};

const startBlink = (target) => {
  return new Promise((resolve, reject) => {
    interval = setInterval(blink.bind(null, target), 350);
    setTimeout(() => {
      target.style.opacity = 0;
      clearInterval(interval);
      resolve();
    }, 5000);
  });
};

const fadeOut = (el1, el2) => {
  return new Promise((resolve, reject) => {
    el1.style.opacity = 0;
    setTimeout(() => {
      el2.setAttribute("style", "opacity:0 !important");
      resolve();
    }, 3000);
  });
};

const handleGameMode = (gameMode) => {
  console.log(gameMode);
  let gameModeElementToHide;
  let welcomeText = document.getElementById("welcome");
  let pickedGameMode = document.getElementById(gameMode);

  return new Promise((resolve, reject) => {
    if (gameMode === "computer") {
      gameModeElementToHide = document.getElementById("two-player");
    } else if (gameMode === "two-player") {
      gameModeElementToHide = document.getElementById("computer");
    }

    Promise.all([
      startBlink(pickedGameMode),
      fadeOut(gameModeElementToHide, welcomeText),
    ]).then(() => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  });
};

const Welcome = () => {
  const hoverBoxSoundRef = useRef(null);
  const pickPlayerSoundRef = useRef(null);
  const navigate = useNavigate();

  const handleVsComputer = async (e) => {
    pickPlayerSoundRef.current.play();
    await handleGameMode(e.target.id).then(() => navigate("/one-player"));
  };

  const handleTwoPlayer = async (e) => {
    await pickPlayerSoundRef.current.play();
    await handleGameMode(e.target.id).then(() => navigate("/two-player"));
  };

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.muted = false;
    hoverBoxSoundRef.current.play();
  };

  return (
    <div>
      <h1 id="welcome" className="text-welcome transition-opacity duration-700">
        Let's play Tic Tac Toe!
      </h1>

      <div className="fade-in mt-20 max-md:mt-16 flex items-center justify-center gap-10 max-sm:gap-5 max-[396px]:gap-2">
        <Button
          id="computer"
          className="py-7 px-5 max-[480px]:py-6 max-[480px]:px-3 max-[396px]:py-5 max-[396px]:px-2 bg-btn-color/75 
              hover:bg-btn-color/100 hover:scale-110 transition-[background-color,transform,opacity] duration-700"
          subClassName="flex flex-col gap-10 items-center justify-center pointer-events-none"
          onClick={(e) => handleVsComputer(e)}
          onHover={handlePlaySoundOnHover}
        >
          <FaRobot className="text-[2.5rem] max-sm:text-[2rem] max-[396px]:text-2xl" />
          <span className="text-button">vs. Computer</span>
        </Button>

        <Button
          id="two-player"
          className="py-7 px-5 max-[480px]:py-6 max-[480px]:px-3 max-[396px]:py-5 max-[396px]:px-2 bg-btn-color/75 
              hover:bg-btn-color/100 hover:scale-110 transition-[background-color,transform,opacity] duration-700"
          subClassName="flex flex-col gap-10 items-center justify-center pointer-events-none"
          onClick={(e) => handleTwoPlayer(e)}
          onHover={handlePlaySoundOnHover}
        >
          <GiPlayerNext className="text-[2.5rem] max-sm:text-[2rem] max-[396px]:text-2xl" />
          <span className="text-button">Two Player</span>
        </Button>
      </div>

      <audio ref={hoverBoxSoundRef} src={hoverBoxAudio} autoPlay muted />
      <audio ref={pickPlayerSoundRef} src={pickPlayerAudio} autoPlay />
    </div>
  );
};

export default Welcome;
