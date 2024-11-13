import { READY_TO_PLAY, PLAY_GAME } from '../actions/playGameActions';

const GAME_BOARD = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

const initialState = {
    isGamePlay: false,
    mode: "",
    board: []
}

const gameReducers = (state = initialState, action) => {
    switch(action.type) {
        case READY_TO_PLAY:
            return {
                ...state,
                mode: action.payload
            }
        case PLAY_GAME:
            return {
                isGamePlay: true,
                mode: action.payload,
                board: GAME_BOARD
            }
        default:
            return state;
    }   
}

export default gameReducers;