const GameScore = ({
  playerOneName,
  playerTwoName,
  playerOneScore,
  playerTwoScore,
  playerNextTurn,
}) => {
  return (
    <div className="grid grid-cols-3 gap-7 max-[480px]:gap-4 max-[375px]:gap-3">
      <div className="text-bone-white flex flex-col items-center justify-center gap-1">
        <p className="text-sm max-sm:text-xs max-[480px]:text-[0.6rem] max-[375px]:text-[0.575rem]">
          (X)
        </p>
        <p
          className={`${playerNextTurn === 1 && "!text-blood-red"}
            max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]`}
        >
          {playerOneName}
        </p>
      </div>

      <div className="text-bone-white flex items-center justify-center gap-4 max-[375px]:gap-3">
        <p className="max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]">
          {playerOneScore}
        </p>

        <p className="max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]">
          vs
        </p>

        <p className="max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]">
          {playerTwoScore}
        </p>
      </div>

      <div className="text-bone-white flex flex-col items-center justify-center gap-1">
        <p className="text-sm max-sm:text-xs max-[480px]:text-[0.6rem] max-[375px]:text-[0.575rem]">
          (O)
        </p>

        <p
          className={`${playerNextTurn === 2 && "!text-blood-red"}
            max-sm:text-sm max-[480px]:text-xs max-[375px]:text-[0.625rem]`}
        >
          {playerTwoName}
        </p>
      </div>
    </div>
  );
};

export default GameScore;
