import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components";

import { hoverBoxAudio, pickPlayerAudio } from "../constants/audios";

const ErrorBoundary = () => {
  document.title = "Tic Tac Toe | Page not found";

  const navigate = useNavigate();

  const hoverBoxSoundRef = useRef(null);
  const pickPlayerSoundRef = useRef(null);

  const handleReturnGame = async () => {
    await pickPlayerSoundRef.current.play();

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handlePlaySoundOnHover = () => {
    hoverBoxSoundRef.current.play();
  };

  return (
    <div className="text-center">
      <h2 className="text-xl max-[480px]:text-lg">
        <span className="text-blood-red">404</span> | No Page
      </h2>

      <Button
        id="return"
        className="mt-10 max-[480px]:mt-8 py-3 px-5
            bg-matte-black/75 hover:bg-matte-black/100 !rounded-md transition-[background-color] duration-300"
        subClassName="text-xs max-[480px]:text-[0.685rem]"
        onClick={handleReturnGame}
        onHover={handlePlaySoundOnHover}
      >
        Return
      </Button>

      <audio ref={hoverBoxSoundRef} src={hoverBoxAudio} />
      <audio ref={pickPlayerSoundRef} src={pickPlayerAudio} />
    </div>
  );
};

export default ErrorBoundary;
