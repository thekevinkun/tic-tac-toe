import { COMPUTER, TWOPLAYER, RESET } from "../actions/gameDataActions";

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
        playerOneScore: action.payload.playerOneScore || 0,
        playerTwoScore: action.payload.playerTwoScore || 0,
      };
    case TWOPLAYER:
      return {
        ...state,
        playerOneName: action.payload.playerOne,
        playerTwoName: action.payload.playerTwo,
        playerOneScore: action.payload.playerOneScore || 0,
        playerTwoScore: action.payload.playerTwoScore || 0,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default dataReducers;
