import React, {useState} from 'react';
import {CART_STORAGE, CURRENT_USER} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {Growl} from "primereact/growl";
import "./CartDetails.css";
import {getFromStorage, saveToStorage} from "../redux/actions/storage";
import {Link, Redirect} from "react-router-dom";

function CartDetails({userStore, cartStore, setCartStore}) {

    const [toOrder, setToOrder] = useState(false);
    const [growl, setGrowl] = useState(undefined);

    const getCart = () => {
        let cart = cartStore.data;
        if (cart === undefined) {
            cart = [];
        } else {
            cart = cart.slice();
        }
        return cart;
    };

    const removeFromCart = (cartProduct) => {
        const cart = getCart();
        const index = cart.indexOf(cartProduct);
        if (index > -1) {
            cart.splice(index, 1);
            setCartStore(cart);
            growl.show({severity: "success", summary: "Kosár", detail: "Termék eltávolítva a kosárból!"});
        }
    };

    const setQuantity = (cartProduct, quantity) => {
        const cart = getCart();
        const index = cart.indexOf(cartProduct);
        if (index > -1) {
            cart[index].quantity = quantity;
            setCartStore(cart);
        }
    };

    const increaseQuantity = (cartProduct) => {
        const currentQuantity = cartProduct.quantity;
        setQuantity(cartProduct, currentQuantity + 1);
    };

    const decreaseQuantity = (cartProduct) => {
        const currentQuantity = cartProduct.quantity;
        if (currentQuantity > 1) {
            setQuantity(cartProduct, currentQuantity - 1);
        }
    };

    const goToOrder = () => {
        if (userStore.data.error === true) {
            growl.show({severity: "error", summary: "Rendelés", detail: "A rendeléshez előbb be kell jelentkezned!"});
        } else {
            setToOrder(true);
        }
    };

    if (toOrder === true) {
        return <Redirect to="/order" />
    }

    let cart = cartStore.data;
    if (cart === null || cart === undefined || cart.length === 0) {
        return (
            <div>
                <p>A kosár üres!</p>
            </div>
        );
    } else {
        const priceSum = cart.map(cartProduct => cartProduct.product.price * cartProduct.quantity).reduce((a, b) => a + b, 0);
        return (
            <>
                <Growl ref={(el) => setGrowl(el)} />
                <div className="container-fluid">
                    {cart.map(cartProduct => {
                        let product = cartProduct.product;
                        let quantity = cartProduct.quantity;
                        return (
                            <div key={product.id} className="row cart-product">
                                <div className="col-12 col-lg-1 space-bottom space-top">
                                    <button className="custom-button red-button" style={{fontSize: "0.8em"}}
                                            onClick={() => removeFromCart(cartProduct)}>
                                        <i className="pi pi-times"/>
                                    </button>
                                </div>

                                <Link className="col-12 col-lg-6 space-bottom space-top" to={"/product/" + product.id}>
                                    <span>{product.name}</span>
                                </Link>

                                <div className="row col-12 col-lg-3 space-bottom space-top">
                                    <div className="col-4">
                                        <button className="custom-button bold" style={{fontSize: "0.8em"}}
                                                onClick={() => decreaseQuantity(cartProduct)}>
                                            <i className="pi pi-minus"/>
                                        </button>
                                    </div>
                                    <div className="col-5">{quantity} db</div>
                                    <div className="col-3">
                                        <button className="custom-button bold" style={{fontSize: "0.8em"}}
                                                onClick={() => increaseQuantity(cartProduct)}>
                                            <i className="pi pi-plus"/>
                                        </button>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-2 space-bottom space-top text-right">
                                    {(product.price * quantity).toLocaleString()} Ft
                                </div>
                            </div>
                        );
                    })}

                    <div className="sum-product elements-apart max-width">
                        <span className="bold">Összesen</span>
                        <span className="bold">{priceSum.toLocaleString()} Ft</span>
                    </div>

                    <button className="custom-button pull-right"
                            onClick={goToOrder}>
                        Tovább a megrendeléshez
                    </button>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCartStore: (data) => saveToStorage(constants.CART_STORAGE_NAME, data, {
        callback: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_STORAGE_NAME))
    }),
});

const mapStateToProps = state => ({
    cartStore: state[CART_STORAGE],
    userStore: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);