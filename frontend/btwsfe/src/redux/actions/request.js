import {DO_NOTHING, REQUEST_FAILURE, REQUEST_IN_PROGRESS, REQUEST_SUCCESS} from "../constants/action-types";
import axios from "axios";
import store from "../store";
import constants from "../../Constants";

export function fetchToStore(namespace, path, cacheNeeded) {
    const currentState = store.getState()[namespace];

    if (currentState.fetchedAlready === false || !cacheNeeded === true) {
        return (dispatch) => new Promise((resolve, reject) => {
            dispatch({
                type: `${namespace}/${REQUEST_IN_PROGRESS}`
            });

            return axios({
                method: "GET",
                url: `${constants.BACKEND_URL}${path}`,
                withCredentials: true
            }).then(response => {
                dispatch({
                    type: `${namespace}/${REQUEST_SUCCESS}`,
                    data: response.data
                });
                resolve(response.data);
            }).catch(error => {
                let data = { message: "Váratlan hiba történt!" };
                if (error.response !== undefined) {
                    data = error.response.data;
                }
                dispatch({
                    type: `${namespace}/${REQUEST_FAILURE}`,
                    data: data,
                    error: error
                });
            });
        });
    } else {
        return (dispatch) => new Promise((resolve, reject) => {
            resolve(currentState.data);
            return {
                type: DO_NOTHING
            };
        });
    }
}

export function sendToBackend(namespace, path, method, data = undefined) {
    if (!["POST", "PUT", "DELETE"].includes(method)) {
        return (dispatch) => new Promise((resolve, reject) => {
            reject({ message: "Elfogadott HTTP metódusok: POST, PUT, DELETE" });
            return {
                type: DO_NOTHING
            };
        });
    }

    return (dispatch) => new Promise((resolve, reject) => {
        dispatch({
            type: `${namespace}/${REQUEST_IN_PROGRESS}`
        });

        return axios({
            method: method,
            url: `${constants.BACKEND_URL}${path}`,
            data: data,
            withCredentials: true
        }).then(response => {
            dispatch({
                type: `${namespace}/${REQUEST_SUCCESS}`,
                data: response.data
            });
            resolve(response.data);
        }).catch(error => {
            let data = { message: "Váratlan hiba történt!" };
            if (error.response !== undefined) {
                data = error.response.data;
            }
            dispatch({
                type: `${namespace}/${REQUEST_FAILURE}`,
                data: data,
                error: error
            });
        });
    });
}
