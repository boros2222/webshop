import {combineReducers} from "redux";
import genericReducer from "./generic";
import {AUTHENTICATION, CATEGORY, CURRENT_USER, PRODUCT, PRODUCT_DETAILS} from "../constants/namespaces";

const rootReducer = combineReducers({
    category: genericReducer(CATEGORY),
    product: genericReducer(PRODUCT),
    productDetails: genericReducer(PRODUCT_DETAILS),
    authentication: genericReducer(AUTHENTICATION),
    currentUser: genericReducer(CURRENT_USER)
});

export default rootReducer;