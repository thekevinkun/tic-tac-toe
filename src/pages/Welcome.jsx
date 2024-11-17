import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../components";

import { resetData } from "../redux/actions/gameDataActions";
import { isGameReady, resetGame } from "../redux/actions/playGameActions";

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
  document.title = "Tic Tac Toe";

  const hoverBoxSoundRef = useRef(null);
  const pickPlayerSoundRef = useRef(null);

  const [stopPlay, setStopPlay] = useState(false);

  const { isGameReadyToPlay, isGameToPlay } = useSelector(
    (state) => state.game
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVsComputer = async (e) => {
    await setStopPlay(true);
    await pickPlayerSoundRef.current.play();
    await handleGameMode(e.target.id)
      .then(() => dispatch(isGameReady("computer")))
      .then(() => navigate("vs-computer"));
  };

  const handleTwoPlayer = async (e) => {
    await setStopPlay(true);
    await pickPlayerSoundRef.current.play();
    await handleGameMode(e.target.id)
      .then(() => dispatch(isGameReady("two player")))
      .then(() => navigate("two-player"));
  };

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.play();
  };

  useEffect(() => {
    if (isGameReadyToPlay || isGameToPlay) {
      dispatch(resetData());
      dispatch(resetGame());
    }
  }, []);

  return (
    <div>
      <h1 id="welcome" className="text-welcome transition-opacity duration-700">
        Let's play Tic Tac Toe!
      </h1>

      <div className="fade-in mt-24 max-md:mt-20 max-[524px]:mt-14 max-[396px]:mt-10 flex items-center justify-center gap-10 max-sm:gap-5 max-[396px]:gap-2">
        <Button
          id="computer"
          className={`${stopPlay && "pointer-events-none"}
            py-8 px-5 max-[480px]:py-6 max-[480px]:px-3 max-[396px]:py-4 max-[396px]:px-2 
          bg-matte-black/75 hover:bg-matte-black/100 hover:scale-110 transition-[background-color,transform,opacity] duration-700`}
          subClassName="flex flex-col gap-10 items-center justify-center pointer-events-none"
          onClick={(e) => handleVsComputer(e)}
          onHover={handlePlaySoundOnHover}
        >
          <FaRobot className="text-[2.5rem] max-sm:text-[2rem] max-[396px]:text-2xl" />
          <span className="text-button">vs. Computer</span>
        </Button>

        <Button
          id="two-player"
          className={`${stopPlay && "pointer-events-none"}
            py-8 px-5 max-[480px]:py-6 max-[480px]:px-3 max-[396px]:py-4 max-[396px]:px-2 
          bg-matte-black/75 hover:bg-matte-black/100 hover:scale-110 transition-[background-color,transform,opacity] duration-700`}
          subClassName="flex flex-col gap-10 items-center justify-center pointer-events-none"
          onClick={(e) => handleTwoPlayer(e)}
          onHover={handlePlaySoundOnHover}
        >
          <GiPlayerNext className="text-[2.5rem] max-sm:text-[2rem] max-[396px]:text-2xl" />
          <span className="text-button">Two Player</span>
        </Button>
      </div>

      <audio ref={hoverBoxSoundRef} src={hoverBoxAudio} />
      <audio ref={pickPlayerSoundRef} src={pickPlayerAudio} />
    </div>
  );
};

export default Welcome;
