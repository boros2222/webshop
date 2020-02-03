import {SET_DATA} from "../constants/action-types";
import Cookies from 'universal-cookie';

export function getCookie(namespace, cookieName) {
    return function (dispatch) {
        const cookies = new Cookies();
        let data = cookies.get(cookieName);
        dispatch({
            type: `${namespace}/${SET_DATA}`,
            data: data,
        });
    }
}

export function setCookie(cookieName, cookieValue, {path = "/", callback = undefined} = {}) {
    const cookies = new Cookies();
    cookies.set(cookieName, cookieValue, {
        path: path,
        domain: "localhost"
    });
    if (callback !== undefined) {
        callback();
    }
}

export function removeCookie(cookieName, {path = "/", callback = undefined} = {}) {
    const cookies = new Cookies();
    cookies.remove(cookieName, {
        path: path,
        domain: "localhost"
    });
    if (callback !== undefined) {
        callback();
    }
}