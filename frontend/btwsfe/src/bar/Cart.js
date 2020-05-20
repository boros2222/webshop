import React from 'react';
import {CART_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function Cart({closeDropDown, cartStore}) {

    let cart = cartStore.data;

    if (cart === null || cart === undefined || cart.length === 0) {
        return (
            <div className="secondary-darker-color">
                <p className="font-size-normal">A kosár üres!</p>
            </div>
        );
    } else {
        const priceSum = cart.map(cartProduct => cartProduct.product.price * cartProduct.quantity).reduce((a, b) => a + b, 0);
        const quantitySum = cart.map(cartProduct => cartProduct.quantity).reduce((a, b) => a + b, 0);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 secondary-darker-color">
                        <p className="font-size-normal mb-2">
                            Kosárban lévő termékek száma: <span className="font-weight-bold">{quantitySum}</span>
                        </p>
                        <p className="font-size-normal mb-2">
                            Összeg: <span className="font-weight-bold">{priceSum.toLocaleString()} Ft</span>
                        </p>
                    </div>
                    <div className="col-12 col-lg-4 secondary-darker-color flex-center">
                        <Link className="custom-button" onClick={() => closeDropDown()} to={"/cart"}>
                            <span className="font-size-normal">Tovább a kosár tartalmához</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
});
const mapStateToProps = (state) => ({
    cartStore: state[CART_STORAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);