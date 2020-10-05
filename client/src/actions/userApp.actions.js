import {
	TODOS_LOAD_PENDING,
	TODOS_LOAD_SUCESS,
	TODOS_LOAD_ERROR,
	USER_LOGOUT_PENDING,
	USER_LOGOUT_SUCESS,
	USER_LOGOUT_ERROR,
	TODOS_UPDATE_USER,
	TODOS_CREATE_LIST,
	TODOS_UPDATE_LIST,
	TODOS_DELETE_LIST,
	TODOS_COMPLETE_TODO,
	TODOS_CREATE_TODO,
	TODOS_DELETE_TODO,
	TODOS_UPDATE_TODO,
	TODOS_REFRESH,
	TODOS_REFRESH_ERROR,
	TODOS_CHANGE_MESSAGE,
	TODOS_LOADER
} from "./types";

import axios from "axios";

export const loadUser = id => {
	return async dispatch => {
		try {
			dispatch({ type: TODOS_LOAD_PENDING });

			const config = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};

			const res = await axios(config);
			dispatch({ type: TODOS_LOAD_SUCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: TODOS_LOAD_ERROR, payload: error.data });
		}
	};
};

export const logout = () => {
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

export const updateUser = (values, id) => {
	return async dispatch => {
		try {
			const user = {
				fullname: values.newFullname,
				password1: values.newPassword,
				password2: values.newPasswordC
			};

			dispatch({ type: TODOS_LOADER });

			const config = {
				method: "put",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: user
			};

			const res = await axios(config);
			dispatch({ type: TODOS_UPDATE_USER, payload: res.data });

			const config2 = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};
			const newRes = await axios(config2);
			dispatch({ type: TODOS_REFRESH, payload: newRes.data });
		} catch (error) {
			dispatch({ type: TODOS_REFRESH_ERROR, payload: error.data });
		}
	};
};

export const createList = (id, listName) => {
	return async dispatch => {
		try {
			const listData = {
				listName
			};

			dispatch({ type: TODOS_LOADER });

			const config = {
				method: "post",
				url: `/api/users/list/${id}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: listData
			};

			const res = await axios(config);
			dispatch({ type: TODOS_CREATE_LIST, payload: res.data });

			const config2 = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};
			const newRes = await axios(config2);
			dispatch({ type: TODOS_REFRESH, payload: newRes.data });
		} catch (error) {
			dispatch({ type: TODOS_REFRESH_ERROR, payload: error.data });
		}
	};
};

export const updateList = (id, lid, listName) => {
	return async dispatch => {
		try {
			dispatch({ type: TODOS_LOADER });
			const listData = {
				lid,
				listName
			};

			const config = {
				method: "put",
				url: `/api/users/list/${id}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: listData
			};

			const res = await axios(config);
			dispatch({ type: TODOS_UPDATE_LIST, payload: res.data });

			const config2 = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};
			const newRes = await axios(config2);
			dispatch({ type: TODOS_REFRESH, payload: newRes.data });
		} catch (error) {
			dispatch({ type: TODOS_REFRESH_ERROR, payload: error.data });
		}
	};
};

export const deleteList = (id, lid) => {
	return async dispatch => {
		dispatch({ type: TODOS_LOADER });
		try {
			const listData = {
				lid
			};

			const config = {
				method: "delete",
				url: `/api/users/list/${id}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: listData
			};

			const res = await axios(config);
			dispatch({ type: TODOS_DELETE_LIST, payload: res.data });

			const config2 = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};
			const newRes = await axios(config2);
			dispatch({ type: TODOS_REFRESH, payload: newRes.data });
		} catch (error) {
			dispatch({ type: TODOS_REFRESH_ERROR, payload: error.data });
		}
	};
};

export const todoCreate = (id, lid, title, description, haveLimitDate, limitDate) => {
	return async dispatch => {
		try {
			const todoData = {
				lid,
				title,
				description,
				haveLimitDate,
				limitDate
			};

			dispatch({ type: TODOS_LOADER });

			const config = {
				method: "post",
				url: `/api/users/todo/${id}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: todoData
			};

			const res = await axios(config);

			dispatch({ type: TODOS_CREATE_TODO, payload: res.data });

			const config2 = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};
			const newRes = await axios(config2);
			dispatch({ type: TODOS_REFRESH, payload: newRes.data });
		} catch (error) {
			dispatch({ type: TODOS_REFRESH_ERROR, payload: error.data });
		}
	};
};

export const todoUpdate = (id, lid, tid, title, description) => {
	return async dispatch => {
		try {
			const todoData = {
				lid,
				tid,
				title,
				description
			};

			dispatch({ type: TODOS_LOADER });

			const config = {
				method: "put",
				url: `/api/users/todo/${id}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: todoData
			};

			const res = await axios(config);

			dispatch({ type: TODOS_UPDATE_TODO, payload: res.data });

			const config2 = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};
			const newRes = await axios(config2);
			dispatch({ type: TODOS_REFRESH, payload: newRes.data });
		} catch (error) {
			dispatch({ type: TODOS_REFRESH_ERROR, payload: error.data });
		}
	};
};

export const todoComplete = (id, lid, tid, todoStatus) => {
	return async dispatch => {
		try {
			const isCompleted = !todoStatus;
			const todoData = {
				lid,
				tid,
				isCompleted
			};

			const config = {
				method: "patch",
				url: `/api/users/todo/${id}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: todoData
			};

			const res = await axios(config);

			dispatch({ type: TODOS_COMPLETE_TODO, payload: res.data });

			const config2 = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};
			const newRes = await axios(config2);
			dispatch({ type: TODOS_REFRESH, payload: newRes.data });
		} catch (error) {
			dispatch({ type: TODOS_REFRESH_ERROR, payload: error.data });
		}
	};
};

export const todoDelete = (id, lid, tid) => {
	return async dispatch => {
		try {
			const todoData = {
				lid,
				tid
			};

			const config = {
				method: "delete",
				url: `/api/users/todo/${id}`,
				headers: {
					"Content-Type": "application/json"
				},
				data: todoData
			};

			const res = await axios(config);

			dispatch({ type: TODOS_DELETE_TODO, payload: res.data });

			const config2 = {
				method: "get",
				url: `/api/users/${id}`,
				headers: {
					"Content-Type": "application/json"
				}
			};
			const newRes = await axios(config2);
			dispatch({ type: TODOS_REFRESH, payload: newRes.data });
		} catch (error) {
			dispatch({ type: TODOS_REFRESH_ERROR, payload: error.data });
		}
	};
};

export const updateMessage = msg => {
	return {
		type: TODOS_CHANGE_MESSAGE,
		payload: msg
	};
};
