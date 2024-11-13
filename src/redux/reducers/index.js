import { combineReducers } from "redux";
import gameReducers from "./gameReducers";
import dataReducers from "./dataReducers";

const rootReducers = combineReducers({
    game: gameReducers,
    data: dataReducers
})

export default rootReducers;