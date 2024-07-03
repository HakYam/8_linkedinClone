import { combineReducers } from "redux";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
    userState: userReducer //userState is the global state
})

export default rootReducer;