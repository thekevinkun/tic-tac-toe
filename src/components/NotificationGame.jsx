import { useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "./";
import { hoverBoxAudio } from "../constants/audios";

const NotificationGame = ({
  level,
  queryFirstName,
  querySecondName,
  onClick,
}) => {
  const mode = useSelector((state) => state.game.mode);

  const hoverBoxSoundRef = useRef(null);

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.play();
  };

  let error;

  if (mode === "computer") {
    if (!level) {
      error = <p>Please pick your level!</p>;
    } else if (!queryFirstName) {
      error = <p>Please enter your name!</p>;
    }
  } else if (mode === "two player") {
    if (!queryFirstName && !querySecondName) {
      error = <p>Please enter all player name!</p>;
    } else if (!queryFirstName) {
      error = <p>Please enter player one name!</p>;
    } else if (!querySecondName) {
      error = <p>Please enter player two name!</p>;
    }
  }

  return (
    <div className="pop-out absolute z-50">
      <div className="bg-neon-silver rounded-lg">
        <div
          className="py-10 px-10 max-sm:px-7 max-[480px]:py-7 max-[480px]:px-4 max-[375px]:py-5 max-[375px]:px-3  
            flex flex-col items-center justify-center gap-5 max-[480px]:gap-4 max-[375px]:gap-2"
        >
          <h2 className="text-blood-red text-sm max-sm:text-xs max-[480px]:text-[0.675rem] max-[375px]:text-[0.525rem]">
            {error}
          </h2>

          <Button
            id="close"
            className="mt-7 max-[480px]:mt-5 py-3 px-5 max-[480px]:px-4 max-[375px]:py-2 max-[375px]:px-3
                bg-blood-red/80 hover:bg-blood-red/100 !rounded-md transition-[background-color] duration-300"
            subClassName="text-sm max-sm:text-xs max-[480px]:text-[0.625rem] max-[375px]:text-[0.55rem]"
            onClick={onClick}
            onHover={handlePlaySoundOnHover}
          >
            Close
          </Button>
        </div>
      </div>

      <audio ref={hoverBoxSoundRef} src={hoverBoxAudio} />
    </div>
  );
};

export default NotificationGame;
