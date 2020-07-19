import {fetchToStore, sendToBackend} from "../actions/request";
import {CURRENT_USER, RESPONSE_MESSAGE, USER_ROLES, USERS, USERS_COUNT} from "../constants/namespaces";
import {removeCookie} from "../actions/cookie";
import constants from "../../Constants";
import {resetStore} from "./generic-functions";

export const loadCurrentUser = (dispatch) => (
    () => dispatch(fetchToStore(CURRENT_USER, "/users/current", false))
);

export const login = (dispatch) => (
    (user) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/users/session", "POST", user))
        .then(loadCurrentUser(dispatch))
        .then(resetStore(dispatch, RESPONSE_MESSAGE))
);

export const logout = (dispatch) => (
    () => removeCookie(constants.AUTH_COOKIE_NAME, `${constants.API_PATH}/`)
        .then(loadCurrentUser(dispatch))
);

export const registerUser = (dispatch) => (
    (user) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/users", "POST", user))
);

export const activateUser = (dispatch) => (
    (activateCode) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/users/${activateCode}/active`, "PUT"))
);

export const forgotPassword = (dispatch) => (
    (email) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/users/${email}/new-password-code`, "POST"))
);

export const checkNewPasswordCode = (dispatch) => (
    (newPasswordCode) => dispatch(fetchToStore(RESPONSE_MESSAGE, `/users/new-password-code/${newPasswordCode}`, false))
);

export const setNewPassword = (dispatch) => (
    (newPasswordCode, user) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/users/${newPasswordCode}/password`, "PUT", user))
);

export const deleteUser = (dispatch) => (
    (userId) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/users/${userId}`, "DELETE"))
);

export const editUserRole = (dispatch) => (
    (userId, role) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/users/${userId}/role/${role}`, "PUT"))
);

export const editUserActive = (dispatch) => (
    (userId, isActive) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/users/${userId}/active/${isActive}`, "PUT"))
);

export const updateUser = (dispatch) => (
    (user) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/users/${user.id}`, "PUT", user))
        .then(loadCurrentUser(dispatch))
);

export const loadUsers = (dispatch) => (
    (offset, limit) => dispatch(fetchToStore(USERS, `/users/offset/${offset}/limit/${limit}`, false))
);

export const loadUsersCount = (dispatch) => (
    () => dispatch(fetchToStore(USERS_COUNT, `/users/quantity`, false))
);

export const loadUserRoleOptions = (dispatch) => (
    () => dispatch(fetchToStore(USER_ROLES, `/users/role-options`, true))
);
