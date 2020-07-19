import React, {useEffect, useState} from 'react';
import {CURRENT_USER, ORDER_STATUS, ORDERED_PRODUCTS, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Link} from "react-router-dom";
import {Dropdown} from "primereact/dropdown";
import {editOrderStatus, loadOrderedProducts, loadOrderStatusOptions} from "../redux/functions/order-functions";
import {resetStore} from "../redux/functions/generic-functions";
import {dateTimeToString} from "../util/date-util";

function OrderDetails({order, loadOrderedProducts, loadOrderStatusOptions, userStore, orderStatusStore, orderedProductsStore,
                          resetOrderedProducts, editOrderStatus, responseStore, setChangedActiveIndex}) {

    const [orderStatus, setOrderStatus] = useState(undefined);
    const [orderedProducts, setOrderedProducts] = useState(undefined);
    const [orderStatusOptions, setOrderStatusOptions] = useState([]);

    useEffect(() => {
        loadOrderStatusOptions();
        setOrderStatus(order.status.code);
    }, [loadOrderStatusOptions, order]);

    useEffect(() => {
        if (orderStatusStore.isReady()) {
            orderStatusStore.data.forEach(status => {
                setOrderStatusOptions(prevOrderStatusOptions => [...prevOrderStatusOptions, {label: status.label, value: status.code}])
            })
        }
    }, [orderStatusStore]);

    useEffect(() => {
        resetOrderedProducts();
        setOrderedProducts(undefined);
        loadOrderedProducts(order.id);
    }, [loadOrderedProducts, order, resetOrderedProducts]);

    useEffect(() => {
        if (orderedProductsStore.isReady()) {
            setOrderedProducts(orderedProductsStore.data);
        }
    }, [orderedProductsStore]);

    const changeStatus = (event) => {
        editOrderStatus(order.id, event.value).then(() => {
            setOrderStatus(event.value);
            setChangedActiveIndex(orderStatusStore.data.findIndex(status => status.code === event.value));
        });
    };

    return (
        <div className="primary-color row py-1">
            <div className="col-12">
                Rendelés azonosítója: <span className="font-weight-bold">{order.id}</span>
            </div>
            <div className="col-12 col-lg-4">
                Rendelés dátuma: <span className="font-weight-bold">{dateTimeToString(order.orderDate)}</span>
            </div>
            <div className="col-12 col-lg-4">
                Termékek száma: <span className="font-weight-bold">{order.productCount}</span>
            </div>
            <div className="col-12 col-lg-4">
                Összeg: <span className="font-weight-bold">{order.priceSum.toLocaleString()} Ft</span>
            </div>
            <div className="col-12">
                Email cím: <span className="font-weight-bold">{order.userAccountEmail}</span>
            </div>
            <div className="col-12">
                Számlázási név: <span className="font-weight-bold">{order.invoiceName}</span>
            </div>
            <div className="col-12">
                Számlázási cím: <span className="font-weight-bold">{order.invoiceAddress.postalCode} {order.invoiceAddress.city}, {order.invoiceAddress.street} {order.invoiceAddress.houseNumber}</span>
            </div>
            <div className="col-12">
                Szállítási cím: <span className="font-weight-bold">{order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.street} {order.shippingAddress.houseNumber}</span>
            </div>
            <div className="col-12 mt-2">
                <span>Állapot: </span>
                {userStore.isAdmin() ?
                    <div className="primary-color d-flex flex-column flex-lg-row align-items-lg-center">
                        <div><Dropdown options={orderStatusOptions} value={orderStatus} onChange={changeStatus}/></div>
                        <div className="ml-lg-3">{responseStore.getMessage()}</div>
                    </div>
                    :
                    <span className="font-weight-bold">{order.status.label}</span>
                }
            </div>

            <p className="col-12 font-weight-bold font-size-normal mt-3">Termékek:</p>
            <div className="col-12">
                {orderedProducts === undefined ?
                    <i className="pi pi-spin pi-spinner font-size-large"/>
                    :
                    <>
                        <DataTable value={orderedProducts} responsive={true} rowHover={true}>
                            <Column field="product.name" header="Termék neve"
                                    body={orderedProduct => <Link to={"/product/" + orderedProduct.product.id}>{orderedProduct.product.name}</Link>}/>
                            <Column field="quantity" header="Mennyiség" />
                            <Column field="quantity" header="Részösszeg"
                                    body={orderedProduct => `${(orderedProduct.quantity * orderedProduct.price).toLocaleString()} Ft`}/>
                        </DataTable>
                    </>
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loadOrderedProducts: loadOrderedProducts(dispatch),
    loadOrderStatusOptions: loadOrderStatusOptions(dispatch),
    editOrderStatus: editOrderStatus(dispatch),
    resetOrderedProducts: resetStore(dispatch, ORDERED_PRODUCTS)
});
const mapStateToProps = state => ({
    userStore: state[CURRENT_USER],
    orderStatusStore: state[ORDER_STATUS],
    orderedProductsStore: state[ORDERED_PRODUCTS],
    responseStore: state[RESPONSE_MESSAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);