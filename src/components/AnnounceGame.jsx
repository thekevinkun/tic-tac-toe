import { useState, useRef } from "react";

import { Button } from "./";

import { hoverBoxAudio, pickPlayerAudio } from "../constants/audios";

const AnnounceGame = ({
  winner,
  playerOneName,
  playerTwoName,
  playerOneSymbol,
  playerTwoSymbol,
  onContinue,
  onEnd,
}) => {
  const hoverBoxSoundRef = useRef(null);
  const pickPlayerSoundRef = useRef(null);

  const [continueGame, setContinueGame] = useState(false);

  let whosWin = "";
  let whichSymbol = "";

  if (winner === 1) {
    if (playerOneSymbol === "X") {
      whosWin = playerOneName;
      whichSymbol = playerOneSymbol;
    } else {
      whosWin = playerTwoName;
      whichSymbol = playerTwoSymbol;
    }
  } else if (winner === 2) {
    if (playerTwoSymbol === "O") {
      whosWin = playerTwoName;
      whichSymbol = playerTwoSymbol;
    } else {
      whosWin = playerOneName;
      whichSymbol = playerOneSymbol;
    }
  }

  const handleContinueGame = () => {
    pickPlayerSoundRef.current.play();
    setContinueGame(true);
  };

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.play();
  };

  return (
    <div className="absolute z-50">
      <div className="bg-neon-silver rounded-lg">
        {!continueGame ? (
          <div
            className="py-10 px-20 max-sm:py-8 max-sm:px-10 max-[480px]:py-7 max-[480px]:px-5 max-[375px]:py-5 max-[375px]:px-2 
                flex flex-col items-center justify-center"
          >
            {winner > 0 ? (
              <h2 className="text-secondary-black max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]">
                {whosWin}
                <span className="text-blood-red"> ({whichSymbol}) </span>Win!
              </h2>
            ) : (
              <h2>TIE!</h2>
            )}

            <p className="text-secondary-black mt-9 max-[480px]:mt-7 text-sm max-sm:text-xs max-[480px]:text-[0.625rem] max-[375px]:text-[0.55rem]">
              Do you want continue to play?
            </p>

            <div className="flex items-center gap-5">
              <Button
                id="continue"
                className="mt-7 max-[480px]:mt-5 py-3 px-5 max-[480px]:py-2 max-[480px]:px-3 
                    bg-matte-black/75 hover:bg-matte-black/100 !rounded-md transition-[background-color] duration-300"
                subClassName="text-sm max-sm:text-xs max-[480px]:text-[0.625rem] max-[375px]:text-[0.55rem]"
                onClick={handleContinueGame}
                onHover={handlePlaySoundOnHover}
              >
                Continue
              </Button>

              <Button
                id="end"
                className="mt-7 max-[480px]:mt-5 py-3 px-5 max-[480px]:py-2 max-[480px]:px-3 
                    bg-blood-red/80 hover:bg-blood-red/100 !rounded-md transition-[background-color] duration-300"
                subClassName="text-sm max-sm:text-xs max-[480px]:text-[0.625rem] max-[375px]:text-[0.55rem]"
                onClick={onEnd}
                onHover={handlePlaySoundOnHover}
              >
                End
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="py-10 px-20 max-[640px]:py-8 max-[640px]:px-14 max-[480px]:py-6 max-[480px]:px-8 max-[375px]:py-4 max-[375px]:px-5
                 flex flex-col items-center justify-center gap-5 max-[480px]:gap-4 max-[375px]:gap-3"
          >
            <p className="text-secondary-black text-sm max-[640px]:text-xs max-[480px]:text-[0.675rem] max-[375px]:text-[0.525rem]">
              {playerOneSymbol === "X" ? (
                <>
                  Player One is now <span className="text-blood-red">O</span>
                </>
              ) : (
                playerOneSymbol === "O" && (
                  <>
                    Player One is now <span className="text-blood-red">X</span>
                  </>
                )
              )}
            </p>

            <p className="text-secondary-black text-sm max-[640px]:text-xs max-[480px]:text-[0.675rem] max-[375px]:text-[0.525rem]">
              {playerTwoSymbol === "O" ? (
                <>
                  Player Two is now <span className="text-blood-red">X</span>
                </>
              ) : (
                playerTwoSymbol === "X" && (
                  <>
                    Player Two is now <span className="text-blood-red">O</span>
                  </>
                )
              )}
            </p>

            <p className="mt-4 text-secondary-black text-sm max-[640px]:text-xs max-[480px]:text-[0.675rem] max-[375px]:text-[0.525rem]">
              {playerOneSymbol === "O" ? (
                <>
                  {playerOneName} now will go{" "}
                  <span className="text-blood-red">first!</span>
                </>
              ) : (
                playerTwoSymbol === "O" && (
                  <>
                    {playerTwoName} now will go{" "}
                    <span className="text-blood-red">first!</span>
                  </>
                )
              )}
            </p>

            <Button
              id="start"
              className="mt-4 max-[480px]:mt-3 py-3 px-5 max-[480px]:px-4 max-[375px]:px-3 max-[375px]:py-2
                bg-matte-black/75 hover:bg-matte-black/100 !rounded-md transition-[background-color] duration-300"
              subClassName="text-sm max-[640px]:text-xs max-[480px]:text-[0.675rem] max-[375px]:text-[0.525rem]"
              onClick={onContinue}
              onHover={handlePlaySoundOnHover}
            >
              Start
            </Button>
          </div>
        )}
      </div>

      <audio ref={hoverBoxSoundRef} src={hoverBoxAudio} />
      <audio ref={pickPlayerSoundRef} src={pickPlayerAudio} />
    </div>
  );
};

export default AnnounceGame;
