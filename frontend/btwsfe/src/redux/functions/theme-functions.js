import {getFromStorage, removeFromStorage, saveToStorage} from "../actions/storage";
import {THEME_STORAGE} from "../constants/namespaces";
import constants from "../../Constants";

export const loadTheme = (dispatch) => (
    () => dispatch(getFromStorage(THEME_STORAGE, constants.THEME_STORAGE_NAME))
);

export const setTheme = (dispatch) => (
    (theme) => saveToStorage(constants.THEME_STORAGE_NAME, theme)
        .then(loadTheme(dispatch))
);

export const deleteTheme = (dispatch) => (
    () => removeFromStorage(constants.THEME_STORAGE_NAME)
        .then(loadTheme(dispatch))
);
