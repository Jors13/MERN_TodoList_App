/**
 * Types used for each action to be dispatched
 *
 * Naming convention (Not mandatory but highly recommended)
 * "(Reducer type)_(Action to be used)_(Description)"
 * "TODOS_GET_TODOS"
 *
 * Actions:
 * GET: Gets and replace some information
 * UPDATE: Update some information that's already in the reducer
 * DELETE: Delete some information in the reducer
 * ...More to be added if necessary
 */

//Login types Actions
export const USER_LOGIN_PENDING = "USER_LOGIN_PENDING";
export const USER_LOGIN_SUCESS = "USER_LOGIN_SUCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const USER_LOGOUT_PENDING = "USER_LOGOUT_PENDING ";
export const USER_LOGOUT_SUCESS = "USER_LOGOUT_SUCESS ";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR ";
export const USER_SEND_DATA = "USER_SEND_DATA";
export const USER_CHANGE_LOGMESSAGE = "USER_CHANGE_LOGMESSAGE";

//Register types Actions
export const USER_REG_PENDING = "USER_REG_PENDING";
export const USER_REG_SUCESS = "USER_REG_SUCESS";
export const USER_REG_ERROR = "USER_REG_ERROR";
export const USER_CHANGE_REGMESSAGE = "USER_CHANGE_REGMESSAGE";

//User App types Actions
export const TODOS_LOAD_PENDING = "TODOS_LOAD_PENDING";
export const TODOS_LOAD_SUCESS = "TODOS_LOAD_SUCESS";
export const TODOS_LOAD_ERROR = "TODOS_LOAD_ERROR";
export const TODOS_CREATE_LIST = "TODOS_CREATE_LIST";
export const TODOS_UPDATE_LIST = "TODOS_UPDATE_LIST";
export const TODOS_DELETE_LIST = "TODOS_DELETE_LIST";
export const TODOS_COMPLETE_TODO = "TODOS_COMPLETE_TODO";
export const TODOS_CREATE_TODO = "TODOS_CREATE_TODO";
export const TODOS_UPDATE_TODO = "TODOS_UPDATE_TODO";
export const TODOS_DELETE_TODO = "TODOS_DELETE_TODO";
export const TODOS_UPDATE_USER = "TODOS_UPDATE_USER";
export const TODOS_CHANGE_MESSAGE = "TODOS_CHANGE_MESSAGE";
export const TODOS_REFRESH = "TODOS_REFRESH";
export const TODOS_REFRESH_ERROR = "TODOS_REFRESH_ERROR";
export const TODOS_LOADER = "TODOS_LOADER";
