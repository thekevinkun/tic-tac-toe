import {
  COMPUTER,
  TWOPLAYER,
  UPDATE_SCORE,
  RESET_DATA,
} from "../actions/gameDataActions";

const initialState = {
  level: "",
  playerOneName: "",
  playerTwoName: "",
  playerOneScore: 0,
  playerTwoScore: 0,
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case COMPUTER:
      return {
        ...state,
        level: action.payload.level,
        playerOneName: action.payload.playerOne,
        playerTwoName: "COMPUTER",
      };
    case TWOPLAYER:
      return {
        ...state,
        playerOneName: action.payload.playerOne,
        playerTwoName: action.payload.playerTwo,
      };
    case UPDATE_SCORE:
      return {
        ...state,
        playerOneScore: action.payload.playerOneScore,
        playerTwoScore: action.payload.playerTwoScore,
      };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};

export default dataReducers;
