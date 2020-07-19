import {getFromStorage, removeFromStorage, saveToStorage} from "../actions/storage";
import {CART_STORAGE} from "../constants/namespaces";
import constants from "../../Constants";

export const loadCart = (dispatch) => (
    () => dispatch(getFromStorage(CART_STORAGE, constants.CART_STORAGE_NAME))
);

export const setCart = (dispatch) => (
    (data) => saveToStorage(constants.CART_STORAGE_NAME, data)
        .then(loadCart(dispatch))
);

export const emptyCart = (dispatch) => (
    () => removeFromStorage(constants.CART_STORAGE_NAME)
        .then(loadCart(dispatch))
);
