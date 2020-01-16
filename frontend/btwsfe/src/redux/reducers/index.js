import {combineReducers} from "redux";
import genericReducer from "./generic";
import {RESPONSE_MESSAGE, CATEGORY, CURRENT_USER, PRODUCT, PRODUCT_DETAILS} from "../constants/namespaces";

const rootReducer = combineReducers({
    [CATEGORY]: genericReducer(CATEGORY),
    [PRODUCT]: genericReducer(PRODUCT),
    [PRODUCT_DETAILS]: genericReducer(PRODUCT_DETAILS),
    [RESPONSE_MESSAGE]: genericReducer(RESPONSE_MESSAGE),
    [CURRENT_USER]: genericReducer(CURRENT_USER)
});

export default rootReducer;