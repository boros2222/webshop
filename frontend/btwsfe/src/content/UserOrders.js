import React, {useEffect, useState} from 'react';
import {CURRENT_USER, ORDER_STATUS, USER_ORDERS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import OrderDetails from "../component/OrderDetails";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {TabPanel, TabView} from "primereact/tabview";

function UserOrders({loadOrders, ordersStore, userStore, loadOrderStatus, orderStatusStore}) {

    const [orders, setOrders] = useState(undefined);
    const [currentOrder, setCurrentOrder] = useState(undefined);
    const [showDialog, setShowDialog] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [changedActiveIndex, setChangedActiveIndex] = useState(-1);

    useEffect(() => {
        loadOrderStatus();
        if (userStore.isReady() && orderStatusStore.isReady()) {
            loadOrders(userStore.data.id, userStore.isAdmin(), orderStatusStore.data[activeIndex].code);
        }
    }, [activeIndex, loadOrderStatus, loadOrders, orderStatusStore, userStore]);

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
            const xDateString = `${x.orderDate.year}${x.orderDate.monthValue}${x.orderDate.dayOfMonth}`;
            const yDateString = `${y.orderDate.year}${y.orderDate.monthValue}${y.orderDate.dayOfMonth}`;
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
                        <DataTable value={orders} responsive={true}>
                            <Column sortable={true} field="orderDate" header="Rendelés dátuma" sortFunction={sortByOrderDate}
                                    body={(order) => `${order.orderDate.year}.${order.orderDate.monthValue < 10 ? '0' : ''}${order.orderDate.monthValue}.${order.orderDate.dayOfMonth}.`} />
                            <Column sortable={true} field="userAccountEmail" header="Email cím" />
                            <Column sortable={true} field="productCount" header="Termékek száma" />
                            <Column sortable={true} field="priceSum" header="Összeg"
                                    body={(order) => `${order.priceSum.toLocaleString()} Ft`} />
                            <Column field="status" header="Állapot"
                                    body={(order) => order.status.label} />
                            <Column field="detailsButton" header="Művelet"
                                    body={(order) => <button className="custom-button-inverse" onClick={() => {
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
    loadOrders: (userId, isAdmin, status) => {
        const path = isAdmin ? `/order/list/${status}` : `/order/list/${userId}/${status}`;
        dispatch(fetchToStore(USER_ORDERS, path, false));
    },
    loadOrderStatus: () => dispatch(fetchToStore(ORDER_STATUS, `/order/list/status`, true))
});
const mapStateToProps = state => ({
    ordersStore: state[USER_ORDERS],
    userStore: state[CURRENT_USER],
    orderStatusStore: state[ORDER_STATUS]
});
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);