import React, {useEffect} from 'react';
import {CURRENT_USER, UPLOAD_RESPONSE, USER_ORDERS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore, uploadToBackend} from "../redux/actions/request";
import OrderDetails from "../component/OrderDetails";

function UserOrders({loadOrders, ordersStore, userStore, uploadFile}) {

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
        return <i className="pi pi-spin pi-spinner" style={{'fontSize': '2.5em'}}/>
    }

    const doUpload = (event) => {
        event.preventDefault();
        uploadFile(event.target.fileData.files[0]);
    };

    const orders = ordersStore.data;
    return (
        <>
            <div className="container-fluid">

                {/*<form onSubmit={doUpload} encType="multipart/form-data">
                    <input type="file" id="fileData" name="fileData"/>
                    <button>Küldés</button>
                </form>*/}

                <p className="bold" style={{fontSize: "1.5em"}}>Rendeléseim</p>
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
    loadOrders: (userId) => dispatch(fetchToStore(USER_ORDERS, `/order/list/${userId}`, false)),
    uploadFile: (fileData) => dispatch(uploadToBackend(fileData))
});
const mapStateToProps = state => ({
    ordersStore: state[USER_ORDERS],
    userStore: state[CURRENT_USER],
    uploadResponseStore: state[UPLOAD_RESPONSE]
});
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);