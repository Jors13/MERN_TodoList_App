import {
	USER_REG_SUCESS,
	USER_REG_PENDING,
	USER_REG_ERROR,
	USER_CHANGE_REGMESSAGE
} from "./types";

import axios from "axios";

export const regUser = values => {
	return async dispatch => {
		try {
			const form = {
				fullname: values.regFullname,
				email1: values.regEmail,
				email2: values.regEmailConfirm,
				password1: values.regPassword,
				password2: values.regPasswordConfirm
			};

			dispatch({ type: USER_REG_PENDING, payload: form });

			const config = {
				method: "post",
				url: "/api/users/",
				headers: {
					"Content-Type": "application/json"
				},
				data: form
			};
			const res = await axios(config);
			dispatch({ type: USER_REG_SUCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: USER_REG_ERROR, payload: error.data });
		}
	};
};

export const updateMessage = msg => {
	return {
		type: USER_CHANGE_REGMESSAGE,
		payload: msg
	};
};
