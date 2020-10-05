import {
	USER_CHANGE_LOGMESSAGE,
	USER_LOGIN_PENDING,
	USER_LOGIN_SUCESS,
	USER_LOGIN_ERROR,
	USER_LOGOUT_PENDING,
	USER_LOGOUT_SUCESS,
	USER_LOGOUT_ERROR
} from "./types";

import axios from "axios";

export const updateMessage = msg => {
	return {
		type: USER_CHANGE_LOGMESSAGE,
		payload: msg
	};
};

export const logIn = values => {
	return async dispatch => {
		try {
			const form = {
				email: values.logEmail,
				password: values.logPassword
			};

			dispatch({ type: USER_LOGIN_PENDING, payload: form });

			const config = {
				method: "post",
				url: "/api/users/login",
				headers: {
					"Content-Type": "application/json"
				},
				data: form
			};

			const res = await axios(config);
			dispatch({ type: USER_LOGIN_SUCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: USER_LOGIN_ERROR, payload: error.data });
		}
	};
};

export const logOut = () => {
	return async dispatch => {
		try {
			dispatch({ type: USER_LOGOUT_PENDING });

			const config = {
				method: "get",
				url: "/api/users/logout",
				headers: {
					"Content-Type": "application/json"
				}
			};

			const res = await axios(config);
			dispatch({ type: USER_LOGOUT_SUCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: USER_LOGOUT_ERROR, payload: error.data });
		}
	};
};
