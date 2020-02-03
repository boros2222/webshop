import React, {Component, Fragment} from 'react';
import {CART_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {Growl} from "primereact/growl";
import "./CartDetails.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {getFromStorage, saveToStorage} from "../redux/actions/storage";
import {Link} from "react-router-dom";

class CartDetails extends Component {

    removeFromCart = (cartProduct) => {
        let cart = this.props.cart.data;
        if (cart === undefined) {
            cart = [];
        } else {
            cart = cart.slice();
        }
        const index = cart.indexOf(cartProduct);
        if (index > -1) {
            cart.splice(index, 1);
            this.props.setCart(cart);
            this.growl.show({severity: "success", summary: "Kosár", detail: "Termék eltávolítva a kosárból!"});
        }
    };

    render() {

        let cart = this.props.cart.data;

        if (cart === null || cart === undefined || cart.length === 0) {
            return (
                <div>
                    <p>A kosár üres!</p>
                </div>
            );
        } else {
            const priceSum = cart.map(product => product.price).reduce((a, b) => a + b, 0);
            return (
                <Fragment>
                    <Growl ref={(el) => this.growl = el} />
                    <div className="max-width">
                        {cart.map(cartProduct => {
                            return (
                                <div key={cartProduct.id} className="cart-product elements-apart max-width">
                                    <Link to={"/product/" + cartProduct.id}>
                                        <span>{cartProduct.name}</span>
                                    </Link>
                                    <span>
                                        <button className="custom-button" style={{fontSize: "0.8em", marginRight: "1.5em"}}
                                                onClick={() => this.removeFromCart(cartProduct)}>
                                            Eltávolítás
                                        </button>
                                        <span>{cartProduct.price.toLocaleString()} Ft</span>
                                    </span>
                                </div>
                            );
                        })}

                        <div className="cart-product elements-apart max-width">
                            <span className="bold">Összesen</span>
                            <span className="bold">{priceSum.toLocaleString()} Ft</span>
                        </div>

                        <button className="custom-button pull-right" style={{marginTop: "2em"}}>Tovább a megrendeléshez</button>
                    </div>
                </Fragment>
            )
        }
    }
}

const mapDispatchToProps = dispatch => ({
    setCart: (data) => saveToStorage(constants.CART_COOKIE_NAME, data, {
        callback: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_COOKIE_NAME))
    }),
});

const mapStateToProps = state => ({
    cart: state[CART_STORAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);