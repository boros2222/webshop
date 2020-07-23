import React, {useEffect, useState} from 'react';
import {CURRENT_USER, ORDER_STATUS, RESPONSE_MESSAGE, USER_ORDERS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import OrderDetails from "../component/OrderDetails";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {TabPanel, TabView} from "primereact/tabview";
import {loadOrders, loadOrderStatusOptions} from "../redux/functions/order-functions";
import {resetStore} from "../redux/functions/generic-functions";
import {dateTimeToString} from "../util/date-util";

function UserOrders({loadOrders, ordersStore, userStore, loadOrderStatusOptions, orderStatusStore, resetMessage}) {

    const [orders, setOrders] = useState(undefined);
    const [currentOrder, setCurrentOrder] = useState(undefined);
    const [showDialog, setShowDialog] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [changedActiveIndex, setChangedActiveIndex] = useState(-1);

    useEffect(() => {
        loadOrderStatusOptions();
    }, [loadOrderStatusOptions]);

    useEffect(() => {
        if (userStore.isReady() && orderStatusStore.isReady()) {
            loadOrders(userStore.data.id, userStore.isAdmin(), orderStatusStore.data[activeIndex].code);
        }
    }, [activeIndex, loadOrders, orderStatusStore, userStore]);

    useEffect(() => {
        if (ordersStore.isReady()) {
            setOrders(ordersStore.data);
        }
    }, [ordersStore]);

    const onHide = () => {
        if (changedActiveIndex !== -1) {
            setActiveIndex(changedActiveIndex);
            setChangedActiveIndex(-1);
        }
        setShowDialog(false);
    };

    const sortByOrderDate = (event) => {
        const sortedOrders = [...orders];
        sortedOrders.sort((x, y) => {
            const xDateString = dateTimeToString(x.orderDate);
            const yDateString = dateTimeToString(y.orderDate);
            return (xDateString < yDateString ? -event.order : (xDateString > yDateString ? event.order : 0));
        });
        return sortedOrders;
    };

    if (!userStore.isReady()) {
        return <p>Rendelések megtekintéséhez be kell jelentkezni!</p>
    }

    if (!ordersStore.isReady() || !userStore.isReady() || !orderStatusStore.isReady()) {
        return <i className="pi pi-spin pi-spinner font-size-large"/>
    }

    return (
        <>
            <p className="font-weight-bold font-size-medium">{userStore.isAdmin() ? "Rendelések" : "Rendeléseim"}</p>
            <Dialog className="container mh-100 overflow-auto" header="Rendelés részletei" footer={<></>} visible={showDialog} onHide={onHide} modal={true}>
                {currentOrder &&
                    <OrderDetails order={currentOrder} setChangedActiveIndex={setChangedActiveIndex}/>
                }
            </Dialog>

            <TabView activeIndex={activeIndex} onTabChange={(event) => setActiveIndex(event.index)}>
                {orderStatusStore.data.map(status => (
                    <TabPanel key={status.code} header={status.label}>
                        <DataTable value={orders} responsive={true} autoLayout={true}>
                            <Column sortable={true} field="orderDate" header="Rendelés dátuma" sortFunction={sortByOrderDate}
                                    body={(order) => dateTimeToString(order.orderDate)} />
                            <Column sortable={true} field="userAccountEmail" header="Email cím" />
                            <Column sortable={true} field="productCount" header="Termékek száma" />
                            <Column sortable={true} field="priceSum" header="Összeg"
                                    body={(order) => `${order.priceSum.toLocaleString()} Ft`} />
                            <Column field="status.label" header="Állapot" />
                            <Column field="detailsButton" header="Művelet"
                                    body={(order) => <button className="custom-button-inverse" onClick={() => {
                                        resetMessage();
                                        setCurrentOrder(order);
                                        setShowDialog(true);
                                    }}>Részletek</button>} />
                        </DataTable>
                    </TabPanel>
                ))}
            </TabView>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    loadOrders: loadOrders(dispatch),
    loadOrderStatusOptions: loadOrderStatusOptions(dispatch),
    resetMessage: resetStore(dispatch, RESPONSE_MESSAGE)
});
const mapStateToProps = state => ({
    ordersStore: state[USER_ORDERS],
    userStore: state[CURRENT_USER],
    orderStatusStore: state[ORDER_STATUS]
});
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);