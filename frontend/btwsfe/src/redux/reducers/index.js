import {combineReducers} from "redux";
import genericReducer from "./generic";
import {
    CART_STORAGE,
    CATEGORY,
    CURRENT_USER,
    PRODUCT_DETAILS,
    PRODUCTS,
    RESPONSE_MESSAGE
} from "../constants/namespaces";

const rootReducer = combineReducers({
    [CATEGORY]: genericReducer(CATEGORY),
    [PRODUCTS]: genericReducer(PRODUCTS),
    [PRODUCT_DETAILS]: genericReducer(PRODUCT_DETAILS),
    [RESPONSE_MESSAGE]: genericReducer(RESPONSE_MESSAGE),
    [CURRENT_USER]: genericReducer(CURRENT_USER),
    [CART_STORAGE]: genericReducer(CART_STORAGE),
});

export default rootReducer;