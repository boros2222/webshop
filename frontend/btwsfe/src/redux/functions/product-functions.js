import {fetchToStore, sendToBackend} from "../actions/request";
import {CATEGORY, PRODUCT_DETAILS, PRODUCTS, RESPONSE_MESSAGE} from "../constants/namespaces";

export const loadCategories = (dispatch) => (
    () => dispatch(fetchToStore(CATEGORY, "/categories", true))
);

export const loadProducts = (dispatch) => (
    (offset, limit, sortOption) =>
        dispatch(fetchToStore(PRODUCTS, `/products/offset/${offset}/limit/${limit}/sort/${sortOption}`, false))
);

export const loadProductsByCategory = (dispatch) => (
    (categoryId, offset, limit, sortOption) =>
        dispatch(fetchToStore(PRODUCTS, `/products/category/${categoryId}/offset/${offset}/limit/${limit}/sort/${sortOption}`, false))
);

export const loadProductsBySearch = (dispatch) => (
    (searchTerm, offset, limit, sortOption) =>
        dispatch(fetchToStore(PRODUCTS, `/products/search/${searchTerm}/offset/${offset}/limit/${limit}/sort/${sortOption}`, false))
);

export const loadProduct = (dispatch) => (
    (productId) => dispatch(fetchToStore(PRODUCT_DETAILS, `/products/${productId}`, false))
);

export const editProduct = (dispatch) => (
    (product) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/products", "PUT", product))
);

export const newProduct = (dispatch) => (
    (product) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/products", "POST", product))
);

export const deleteProduct = (dispatch) => (
    (productId) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/products/${productId}`, "DELETE"))
);
