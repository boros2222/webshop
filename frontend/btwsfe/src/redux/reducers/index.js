import {combineReducers} from "redux";
import genericReducer from "./generic";
import {
    CART_STORAGE,
    CATEGORY,
    CURRENT_USER,
    ORDER_STATUS,
    ORDERED_PRODUCTS,
    PRODUCT_DETAILS,
    PRODUCTS,
    RESPONSE_MESSAGE,
    THEME_STORAGE,
    USER_ORDERS,
    USER_ROLES,
    USERS,
    USERS_COUNT
} from "../constants/namespaces";

const rootReducer = combineReducers({
    [CATEGORY]: genericReducer(CATEGORY),
    [PRODUCTS]: genericReducer(PRODUCTS),
    [PRODUCT_DETAILS]: genericReducer(PRODUCT_DETAILS),
    [RESPONSE_MESSAGE]: genericReducer(RESPONSE_MESSAGE),
    [CURRENT_USER]: genericReducer(CURRENT_USER),
    [USER_ORDERS]: genericReducer(USER_ORDERS),
    [CART_STORAGE]: genericReducer(CART_STORAGE),
    [THEME_STORAGE]: genericReducer(THEME_STORAGE),
    [ORDER_STATUS]: genericReducer(ORDER_STATUS),
    [ORDERED_PRODUCTS]: genericReducer(ORDERED_PRODUCTS),
    [USERS]: genericReducer(USERS),
    [USERS_COUNT]: genericReducer(USERS_COUNT),
    [USER_ROLES]: genericReducer(USER_ROLES)
});

export default rootReducer;