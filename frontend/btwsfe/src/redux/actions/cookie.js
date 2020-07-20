import {SET_DATA} from "../constants/action-types";
import Cookies from 'universal-cookie';
import constants from "../../Constants";

export function getCookie(namespace, cookieName) {
    return (dispatch) => new Promise((resolve, reject) => {
        const cookies = new Cookies();
        const data = cookies.get(cookieName);
        dispatch({
            type: `${namespace}/${SET_DATA}`,
            data: data,
        });
        resolve(data);
    });
}

export function setCookie(cookieName, cookieValue, path = "/") {
    return new Promise((resolve, reject) => {
        const cookies = new Cookies();
        cookies.set(cookieName, cookieValue, {
            path: path,
            domain: constants.FRONTEND_DOMAIN
        });
        resolve();
    });
}

export function removeCookie(cookieName, path) {
    return new Promise((resolve, reject) => {
        const cookies = new Cookies();
        cookies.remove(cookieName, {
            path: path,
            domain: constants.FRONTEND_DOMAIN
        });
        resolve();
    });
}