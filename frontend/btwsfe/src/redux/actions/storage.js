import {SET_DATA} from "../constants/action-types";

export function getFromStorage(namespace, key) {
    return (dispatch) => new Promise((resolve, reject) => {
        const data = JSON.parse(localStorage.getItem(key));
        dispatch({
            type: `${namespace}/${SET_DATA}`,
            data: data,
        });
        resolve(data);
    });
}

export function saveToStorage(key, value) {
    return new Promise((resolve, reject) => {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
    });
}

export function removeFromStorage(key) {
    return new Promise((resolve, reject) => {
        localStorage.removeItem(key);
        resolve();
    });
}