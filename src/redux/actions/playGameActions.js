export const READY_TO_PLAY = "READY_TO_PLAY";
export const PLAY_GAME = "PLAY_GAME";
export const RESET_GAME = "RESET_GAME";

export const isGameReady = (data) => {
  return {
    type: READY_TO_PLAY,
    payload: data,
  };
};

export const isGamePlay = () => {
  return {
    type: PLAY_GAME,
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};
