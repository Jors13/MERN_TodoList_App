import {
	USER_REG_SUCESS,
	USER_REG_PENDING,
	USER_REG_ERROR,
	USER_CHANGE_REGMESSAGE
} from "../actions/types";

const initialState = {
	userData: "",
	message: "",
	messageType: "info",
	loading: false,
	created: false
};

const regUser = (state = initialState, action) => {
	switch (action.type) {
		case USER_REG_SUCESS:
			return {
				...state,
				created: action.payload.created,
				message: action.payload.message,
				messageType: action.payload.messageType,
				loading: false
			};
		case USER_REG_ERROR:
			return {
				...state,
				created: false,
				message: action.payload.message,
				messageType: action.payload.messageType,
				loading: false
			};
		case USER_REG_PENDING:
			return {
				...state,
				userData: action.payload,
				loading: true
			};
		case USER_CHANGE_REGMESSAGE:
			return {
				...state,
				message: action.payload
			};
		default:
			return state;
	}
};

export default regUser;
