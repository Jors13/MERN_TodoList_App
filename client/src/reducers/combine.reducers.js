import { combineReducers } from "redux";
import logUser from "./userLog.reducer";
import regUser from "./userReg.reducer";
import appUser from "./userApp.reducer";

const rootReducer = combineReducers({
	logUser,
	regUser,
	appUser
});

export default rootReducer;
