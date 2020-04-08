import React, {useEffect} from 'react';
import {CURRENT_USER, USER_ORDERS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import OrderDetails from "../component/OrderDetails";

function UserOrders({loadOrders, ordersStore, userStore}) {

    useEffect(() => {
        if (userStore.isReady()) {
            loadOrders(userStore.data.id);
        }
    }, [loadOrders, userStore]);

    if (userStore.error !== undefined) {
        return <p>Előbb jelentkezz be!</p>
    }

    if (ordersStore.error !== undefined) {
        return <p>{ordersStore.data.message}</p>
    } else if (ordersStore.isFetching === true || ordersStore.data === undefined) {
        return <i className="pi pi-spin pi-spinner font-size-large"/>
    }

    const orders = ordersStore.data;
    return (
        <>
            <div className="container-fluid">
                <p className="font-weight-bold font-size-medium">Rendeléseim</p>
                {orders.map(order =>
                    <div key={order.orderDetailsId} className="primary-color">
                        <OrderDetails order={order}/>
                    </div>
                )}
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    loadOrders: (userId) => dispatch(fetchToStore(USER_ORDERS, `/order/list/${userId}`, false))
});
const mapStateToProps = state => ({
    ordersStore: state[USER_ORDERS],
    userStore: state[CURRENT_USER],
});
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);