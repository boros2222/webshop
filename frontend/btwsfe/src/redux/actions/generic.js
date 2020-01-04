import {DO_NOTHING, REQUEST_FAILURE, REQUEST_IN_PROGRESS, REQUEST_SUCCESS} from "../constants/action-types";
import axios from "axios";
import store from "../store";
import constants from "../../Constants";
import Cookies from 'universal-cookie';

export function fetchToStore(namespace, path, cacheNeeded) {
    const currentState = store.getState()[namespace];

    if (currentState.fetchedAlready === false || !cacheNeeded === true) {
        return function (dispatch) {
            dispatch({
                type: `${namespace}/${REQUEST_IN_PROGRESS}`
            });

            return axios({
                method: 'GET',
                url: `${constants.BACKEND_URL}${path}`,
                withCredentials: true
            }).then(response => {
                dispatch({
                    type: `${namespace}/${REQUEST_SUCCESS}`,
                    data: response.data
                });
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
        }
    } else {
        return {
            type: DO_NOTHING
        };
    }
}

export function sendToBackend(namespace, path, data, callback = undefined) {
    return function (dispatch) {
        dispatch({
            type: `${namespace}/${REQUEST_IN_PROGRESS}`
        });

        return axios({
            method: 'POST',
            url: `${constants.BACKEND_URL}${path}`,
            data: data,
            withCredentials: true
        }).then(response => {
            dispatch({
                type: `${namespace}/${REQUEST_SUCCESS}`,
                data: response.data
            });
            if (callback !== undefined) {
                callback();
            }
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
    }
}

export function removeCookie(cookieName, callback = undefined) {
    const cookies = new Cookies();
    cookies.remove(cookieName, {path: "/btwsbe/api/", domain: "localhost"});
    if (callback !== undefined) {
        callback();
    }
}