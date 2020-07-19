import {fetchToStore, sendToBackend} from "../actions/request";
import {ORDER_STATUS, ORDERED_PRODUCTS, RESPONSE_MESSAGE, USER_ORDERS} from "../constants/namespaces";
import {emptyCart} from "./cart-functions";

export const newOrder = (dispatch) => (
    (order) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/orders", "POST", order))
        .then(emptyCart(dispatch))
);

export const loadOrders = (dispatch) => (
    (userId, isAdmin, status) =>
        dispatch(fetchToStore(USER_ORDERS, isAdmin ? `/orders/status/${status}` : `/orders/user/${userId}/status/${status}`, false))
);

export const loadOrderedProducts = (dispatch) => (
    (orderId) => dispatch(fetchToStore(ORDERED_PRODUCTS, `/orders/${orderId}/products`, false))
);

export const editOrderStatus = (dispatch) => (
    (orderId, status) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/orders/${orderId}/status/${status}`, "PUT"))
);

export const loadOrderStatusOptions = (dispatch) => (
    () => dispatch(fetchToStore(ORDER_STATUS, "/orders/status-options", true))
);
