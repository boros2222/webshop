import {SET_DATA} from "../constants/action-types";

export function getFromStorage(namespace, key) {
    return function (dispatch) {
        const data = JSON.parse(localStorage.getItem(key));
        dispatch({
            type: `${namespace}/${SET_DATA}`,
            data: data,
        });
    }
}

export function saveToStorage(key, value, {callback = undefined} = {}) {
    localStorage.setItem(key, JSON.stringify(value));
    if (callback !== undefined) {
        callback();
    }
}

export function removeFromStorage(key, {callback = undefined} = {}) {
    localStorage.removeItem(key);
    if (callback !== undefined) {
        callback();
    }
}