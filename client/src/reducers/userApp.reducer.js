import {
	TODOS_LOAD_PENDING,
	TODOS_LOAD_SUCESS,
	TODOS_LOAD_ERROR,
	TODOS_UPDATE_USER,
	TODOS_CREATE_LIST,
	TODOS_UPDATE_LIST,
	TODOS_DELETE_LIST,
	TODOS_CREATE_TODO,
	TODOS_COMPLETE_TODO,
	TODOS_UPDATE_TODO,
	TODOS_DELETE_TODO,
	TODOS_REFRESH,
	TODOS_REFRESH_ERROR,
	TODOS_CHANGE_MESSAGE,
	TODOS_LOADER
} from "../actions/types";

const initialState = {
	userData: { id: "", fullname: "", email: "", userlist: [] },
	state: "",
	message: "",
	messageType: "info",
	devMessage: "",
	error: false,
	loading: false
};

const appUser = (state = initialState, action) => {
	switch (action.type) {
		case TODOS_LOAD_PENDING:
			return {
				...state,
				loading: true
			};
		case TODOS_LOAD_SUCESS:
			return {
				...state,
				userData: action.payload,
				loading: false
			};
		case TODOS_UPDATE_USER:
			return {
				...state,
				state: action.payload.updated,
				message: action.payload.message,
				messageType: action.payload.messageType
			};
		case TODOS_CREATE_LIST:
			return {
				...state,
				state: action.payload.created,
				message: action.payload.message,
				messageType: action.payload.messageType
			};
		case TODOS_UPDATE_LIST:
			return {
				...state,
				state: action.payload.updated,
				message: action.payload.message,
				messageType: action.payload.messageType
			};
		case TODOS_DELETE_LIST:
			return {
				...state,
				state: action.payload.delete,
				devMessage: action.payload.message
			};
		case TODOS_CREATE_TODO:
			return {
				...state,
				state: action.payload.created,
				message: action.payload.message,
				messageType: action.payload.messageType
			};
		case TODOS_COMPLETE_TODO:
			return {
				...state,
				state: action.payload.updated,
				devMessage: action.payload.message
			};
		case TODOS_UPDATE_TODO:
			return {
				...state,
				state: action.payload.updated,
				message: action.payload.message,
				messageType: action.payload.messageType
			};
		case TODOS_DELETE_TODO:
			return {
				...state,
				state: action.payload.deleted,
				devMessage: action.payload.message
			};
		case TODOS_LOAD_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case TODOS_REFRESH:
			return {
				...state,
				userData: action.payload,
				loading: false
			};
		case TODOS_REFRESH_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case TODOS_CHANGE_MESSAGE:
			return {
				...state,
				message: action.payload
			};
		case TODOS_LOADER:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};

export default appUser;
