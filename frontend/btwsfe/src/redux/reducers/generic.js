import {REQUEST_FAILURE, REQUEST_IN_PROGRESS, REQUEST_SUCCESS, RESET, SET_DATA} from "../constants/action-types";
import {CURRENT_USER} from "../constants/namespaces";
import React from "react";

const getInitialState = (namespace) => {
    let genericState = {
        data: undefined,
        fetchedAlready: false,
        isFetching: undefined,
        error: undefined,

        isReady: function() {
            return this.error === undefined && this.data !== undefined;
        },
        getMessage: function() {
            if (this.isFetching === true) {
                return <i className="pi pi-spin pi-spinner font-size-large"/>;
            } else if (this.error !== undefined || this.fetchedAlready === true) {
                return this.data.message;
            } else {
                return <></>;
            }
        }
    };

    switch(namespace) {
        case CURRENT_USER:
            genericState.isAdmin = function() {
                return this.isReady() && this.data.userRoles.findIndex(x => x.role === "ADMIN") !== -1;
            };
            return genericState;
        default:
            return genericState;
    }
};

const genericReducer = (namespace) => (state = getInitialState(namespace), action) => {
    switch (action.type) {
        case `${namespace}/${REQUEST_IN_PROGRESS}`:
            return Object.assign({}, state, {
                isFetching: true,
                error: undefined,
                data: undefined
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