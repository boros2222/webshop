import React from 'react';
import {CART_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function Cart(props) {

    let cart = props.cartStore.data;

    if (cart === null || cart === undefined || cart.length === 0) {
        return (
            <div className="secondary-darker-color">
                <p className="navbar-font-size">A kosár üres!</p>
            </div>
        );
    } else {
        const priceSum = cart.map(cartProduct => cartProduct.product.price * cartProduct.quantity).reduce((a, b) => a + b, 0);
        const quantitySum = cart.map(cartProduct => cartProduct.quantity).reduce((a, b) => a + b, 0);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 secondary-darker-color">
                        <p className="navbar-font-size" style={{marginBottom: "1.5em"}}>
                            Kosárban lévő termékek száma: <span className="bold">{quantitySum}</span>
                        </p>
                        <p className="navbar-font-size" style={{marginBottom: "1em"}}>
                            Összeg: <span className="bold">{priceSum.toLocaleString()} Ft</span>
                        </p>
                    </div>
                    <div className="col-12 col-lg-4 secondary-darker-color flex-center">
                        <Link className="custom-button" to={"/cart"}>
                            <span className="navbar-font-size">Tovább a kosár tartalmához</span>
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
    cartStore: state[CART_STORAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);