
import {
    ADD_CATEGORY,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_IN_PROGRESS,
    FETCH_CATEGORIES_SUCCESS
} from "../constants/action-types";

const INITIAL_STATE = {
    data: [],
    fetchedAlready: false,
    isFetching: false,
    error: undefined
};

function categoriesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_IN_PROGRESS:
            return Object.assign({}, state, {
                isFetching: true,
                error: undefined
            });

        case FETCH_CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: undefined,
                fetchedAlready: true,
                data: action.data
            });

        case FETCH_CATEGORIES_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });

        case ADD_CATEGORY:
            return Object.assign({}, state, {
                data: state.data.concat(action.payload)
            });

        default:
            return state;
    }
}

export default categoriesReducer;