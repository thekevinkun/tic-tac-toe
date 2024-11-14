import { READY_TO_PLAY, PLAY_GAME, RESET } from "../actions/playGameActions";

const initialState = {
  isGameReadyToPlay: false,
  isGameToPlay: false,
  mode: "",
};

const gameReducers = (state = initialState, action) => {
  switch (action.type) {
    case READY_TO_PLAY:
      return {
        ...state,
        isGameReadyToPlay: true,
        mode: action.payload,
      };
    case PLAY_GAME:
      return {
        ...state,
        isGameToPlay: true,
        isGameReadyToPlay: false,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default gameReducers;
