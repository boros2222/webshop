import {REQUEST_FAILURE, REQUEST_IN_PROGRESS, REQUEST_SUCCESS, RESET, SET_DATA} from "../constants/action-types";

const INITIAL_STATE = {
    data: undefined,
    fetchedAlready: false,
    isFetching: undefined,
    error: undefined
};

const genericReducer = (namespace) => (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case `${namespace}/${REQUEST_IN_PROGRESS}`:
            return Object.assign({}, state, {
                isFetching: true,
                error: undefined
            });

        case `${namespace}/${REQUEST_SUCCESS}`:
            return Object.assign({}, state, {
                isFetching: false,
                error: undefined,
                fetchedAlready: true,
                data: action.data
            });

        case `${namespace}/${REQUEST_FAILURE}`:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
                error: action.error
            });

        case `${namespace}/${RESET}`:
            return Object.assign({}, state, {
                data: undefined,
                fetchedAlready: false,
                isFetching: undefined,
                error: undefined
            });

        case `${namespace}/${SET_DATA}`:
            return Object.assign({}, state, {
                data: action.data,
            });

        default:
            return state;
    }
};

export default genericReducer;