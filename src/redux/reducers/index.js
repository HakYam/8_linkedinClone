import { combineReducers } from "redux";
import userReducer from "./userSlice";
import articlesReducer from './articlesSlice'  

const rootReducer = combineReducers({
    userState: userReducer, //userState is the global state
    articlesState: articlesReducer
})

export default rootReducer;