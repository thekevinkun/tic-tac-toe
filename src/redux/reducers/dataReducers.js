import { COMPUTER, MULTIPLAYER } from "../actions/gameDataActions";

const initialState = {
    playerOneName: "",
    playerTwoName: "",
    playerOneSymbol: "",
    playerTwoSymbol: ""
}

const dataReducers = (state = initialState, action) => {
    switch(action.type) {
        case COMPUTER:
            return {
                ...state,
                playerOneName: action.payload.playerOne,
                playerTwoName: "COMPUTER",
                playerOneSymbol: action.payload.playerOneSyms,
                playerTwoSymbol: action.payload.playerOneSyms === 'X' ? 'O' : 'X'
            }
        case MULTIPLAYER:
            return {
                playerOneName: action.payload.playerOne,
                playerTwoName: action.payload.playerTwo,
                playerOneSymbol: action.payload.playerOneSyms,
                playerTwoSymbol: action.payload.playerTwoSyms
            }
        default:
            return state;
    }
}

export default dataReducers;