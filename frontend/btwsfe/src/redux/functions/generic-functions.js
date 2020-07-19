import {RESET} from "../constants/action-types";

export const resetStore = (dispatch, namespace) => (
    () => new Promise((resolve, reject) => {
        dispatch({type: `${namespace}/${RESET}`});
        resolve();
    })
);
