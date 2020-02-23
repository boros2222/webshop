import React, {Component, Fragment} from 'react';
import {CART_STORAGE, CURRENT_USER} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {Growl} from "primereact/growl";
import "./CartDetails.css";
import {getFromStorage, saveToStorage} from "../redux/actions/storage";
import {Link, Redirect} from "react-router-dom";

class CartDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toOrder: false
        }
    }

    getCart = () => {
        let cart = this.props.cart.data;
        if (cart === undefined) {
            cart = [];
        } else {
            cart = cart.slice();
        }
        return cart;
    };

    removeFromCart = (cartProduct) => {
        const cart = this.getCart();
        const index = cart.indexOf(cartProduct);
        if (index > -1) {
            cart.splice(index, 1);
            this.props.setCart(cart);
            this.growl.show({severity: "success", summary: "Kosár", detail: "Termék eltávolítva a kosárból!"});
        }
    };

    setQuantity = (cartProduct, quantity) => {
        const cart = this.getCart();
        const index = cart.indexOf(cartProduct);
        if (index > -1) {
            cart[index].quantity = quantity;
            this.props.setCart(cart);
        }
    };

    increaseQuantity = (cartProduct) => {
        const currentQuantity = cartProduct.quantity;
        this.setQuantity(cartProduct, currentQuantity + 1);
    };

    decreaseQuantity = (cartProduct) => {
        const currentQuantity = cartProduct.quantity;
        if (currentQuantity > 1) {
            this.setQuantity(cartProduct, currentQuantity - 1);
        }
    };

    goToOrder = () => {
        if (this.props.user.data.error === true) {
            this.growl.show({severity: "error", summary: "Rendelés", detail: "A rendeléshez előbb be kell jelentkezned!"});
        } else {
            this.setState({
                toOrder: true
            });
        }
    };

    render() {
        if (this.state.toOrder === true) {
            return <Redirect to="/order" />
        }

        let cart = this.props.cart.data;
        if (cart === null || cart === undefined || cart.length === 0) {
            return (
                <div>
                    <p>A kosár üres!</p>
                </div>
            );
        } else {
            const priceSum = cart.map(cartProduct => cartProduct.product.price * cartProduct.quantity).reduce((a, b) => a + b, 0);
            return (
                <Fragment>
                    <Growl ref={(el) => this.growl = el} />
                    <div className="max-width">
                        {cart.map(cartProduct => {
                            let product = cartProduct.product;
                            let quantity = cartProduct.quantity;
                            return (
                                <div key={product.id} className="cart-product elements-apart max-width">
                                    <Link to={"/product/" + product.id}>
                                        <span>{product.name}</span>
                                    </Link>
                                    <span>
                                        <button className="custom-button" style={{fontSize: "0.8em", marginRight: "1em"}}
                                                onClick={() => this.decreaseQuantity(cartProduct)}>
                                            -
                                        </button>
                                        <span style={{marginRight: "1em"}}>{quantity} db</span>
                                        <button className="custom-button" style={{fontSize: "0.8em", marginRight: "2em"}}
                                                onClick={() => this.increaseQuantity(cartProduct)}>
                                            +
                                        </button>

                                        <button className="custom-button" style={{fontSize: "0.8em", marginRight: "1.5em"}}
                                                onClick={() => this.removeFromCart(cartProduct)}>
                                            Eltávolítás
                                        </button>

                                        <span>{(product.price * quantity).toLocaleString()} Ft</span>
                                    </span>
                                </div>
                            );
                        })}

                        <div className="cart-product elements-apart max-width">
                            <span className="bold">Összesen</span>
                            <span className="bold">{priceSum.toLocaleString()} Ft</span>
                        </div>

                        <button className="custom-button pull-right" style={{marginTop: "2em"}}
                                onClick={this.goToOrder}>
                            Tovább a megrendeléshez
                        </button>
                    </div>
                </Fragment>
            )
        }
    }
}

const mapDispatchToProps = dispatch => ({
    setCart: (data) => saveToStorage(constants.CART_STORAGE_NAME, data, {
        callback: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_STORAGE_NAME))
    }),
});

const mapStateToProps = state => ({
    cart: state[CART_STORAGE],
    user: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);