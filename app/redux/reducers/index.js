import { combineReducers } from "redux";
import gameReducer from "./gameReducer";

const reducers = combineReducers({
    gameReducer: gameReducer
})

export default (state, action) => reducers(state, action);