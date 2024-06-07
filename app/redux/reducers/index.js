import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import AuthReducer from "./AuthReducer";

const reducers = combineReducers({
    gameReducer: gameReducer,
    authReducer: AuthReducer
})

export default (state, action) => reducers(state, action);