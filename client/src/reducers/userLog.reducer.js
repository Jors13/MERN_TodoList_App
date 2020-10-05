import {
	USER_LOGIN_SUCESS,
	USER_LOGIN_PENDING,
	USER_LOGIN_ERROR,
	USER_LOGOUT_PENDING,
	USER_LOGOUT_SUCESS,
	USER_LOGOUT_ERROR,
	USER_CHANGE_LOGMESSAGE
} from "../actions/types";

const initialState = {
	id: "",
	message: "",
	messageType: "info",
	loading: false,
	loggedIn: false
};

const logUser = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_PENDING:
			return {
				...state,
				loading: true
			};
		case USER_LOGIN_SUCESS:
			if (action.payload.loggedIn === true) {
				return {
					...state,
					id: action.payload.ObjectId,
					loggedIn: action.payload.loggedIn,
					message: action.payload.message,
					messageType: action.payload.messageType,
					loading: false
				};
			} else {
				return {
					...state,
					loggedIn: action.payload.loggedIn,
					message: action.payload.message,
					messageType: action.payload.messageType,
					loading: false
				};
			}
		case USER_LOGIN_ERROR:
			return {
				...state,
				message: "Error on connect with server",
				devMessage: action.payload,
				loading: false
			};
		case USER_LOGOUT_PENDING:
			return {
				...state
			};
		case USER_LOGOUT_SUCESS:
			return {
				...state,
				id: "",
				loggedIn: action.payload.loggedIn,
				message: action.payload.message,
				messageType: action.payload.messageType
			};
		case USER_LOGOUT_ERROR:
			return {
				...state,
				message: action.payload
			};
		case USER_CHANGE_LOGMESSAGE:
			return {
				...state,
				message: action.payload
			};
		default:
			return state;
	}
};

export default logUser;
