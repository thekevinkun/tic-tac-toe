export const COMPUTER = "COMPUTER";
export const TWOPLAYER = "TWOPLAYER";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const RESET = "RESET";

export const playComputer = (data) => {
  return {
    type: COMPUTER,
    payload: data,
  };
};

export const playTwoPlayer = (data) => {
  return {
    type: TWOPLAYER,
    payload: data,
  };
};

export const updateScore = (data) => {
  return {
    type: UPDATE_SCORE,
    payload: data,
  };
};

export const resetData = () => {
  return {
    type: RESET,
  };
};
