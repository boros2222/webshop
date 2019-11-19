
import {
    ADD_CATEGORY, DO_NOTHING,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_IN_PROGRESS,
    FETCH_CATEGORIES_SUCCESS
} from "../constants/action-types";
import axios from "axios";
import store from "../store";
import constants from "../../Constants";

export function fetchCategories() {
    const categories = store.getState().categories;

    if (categories.fetchedAlready === false) {
        return function (dispatch) {
            dispatch({
                type: FETCH_CATEGORIES_IN_PROGRESS
            });

            return axios({
                method: 'GET',
                url: `${constants.BACKEND_URL}/category/list`,
                withCredentials: true
            }).then(response => {
                dispatch({
                    type: FETCH_CATEGORIES_SUCCESS,
                    data: response.data
                });
            }).catch(error => {
                dispatch({
                    type: FETCH_CATEGORIES_FAILURE,
                    data: error.response.data,
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

export function addCategory(payload) {
    return {
        type: ADD_CATEGORY,
        payload
    };
}

