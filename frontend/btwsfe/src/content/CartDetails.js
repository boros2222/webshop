import React, {useState} from 'react';
import {CART_STORAGE, CURRENT_USER} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {Growl} from "primereact/growl";
import "./CartDetails.css";
import {Link, Redirect} from "react-router-dom";
import {loadCart, setCart} from "../redux/functions/cart-functions";

function CartDetails({userStore, cartStore, setCart, loadCart}) {

    const [toOrder, setToOrder] = useState(false);
    const [growl, setGrowl] = useState(undefined);

    const getCart = (action) => {
        loadCart().then(cartData => {
            let cart;
            if (cartData === undefined) {
                cart = [];
            } else {
                cart = cartData.slice();
            }
            action(cart);
        });
    };

    const removeFromCart = (cartProduct) => {
        getCart((cart) => {
            const index = cart.findIndex(x => x.id === cartProduct.id);
            if (index > -1) {
                cart.splice(index, 1);
                setCart(cart);
                growl.show({severity: "success", summary: "Kosár", detail: "Termék eltávolítva a kosárból!"});
            }
        });
    };

    const addQuantity = (cartProduct, quantity) => {
        getCart((cart) => {
            const foundProduct = cart.find(x => x.product.id === cartProduct.product.id);
            if (foundProduct !== undefined) {
                foundProduct.quantity += quantity;
                setCart(cart);
            }
        });
    };

    const increaseQuantity = (cartProduct) => {
        addQuantity(cartProduct, +1);
    };

    const decreaseQuantity = (cartProduct) => {
        if (cartProduct.quantity > 1) {
            addQuantity(cartProduct, -1);
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
            <>
                <Growl ref={(el) => setGrowl(el)} />
                <p className="font-weight-bold font-size-medium mb-3">Kosár tartalma</p>
                <p>A kosár üres!</p>
            </>
        );
    } else {
        const priceSum = cart.map(cartProduct => cartProduct.product.price * cartProduct.quantity).reduce((a, b) => a + b, 0);
        return (
            <>
                <Growl ref={(el) => setGrowl(el)} />
                <p className="font-weight-bold font-size-medium mb-3">Kosár tartalma</p>
                <div className="container-fluid pb-5">
                    {cart.map(cartProduct => {
                        let product = cartProduct.product;
                        let quantity = cartProduct.quantity;
                        return (
                            <div key={product.id} className="row font-size-normal cart-product primary-color">
                                <div className="col-12 col-lg-1 my-2">
                                    <button className="custom-button red-button font-size-small"
                                            onClick={() => removeFromCart(cartProduct)}>
                                        <i className="pi pi-times"/>
                                    </button>
                                </div>

                                <Link className="col-12 col-lg-6 my-2" to={"/product/" + product.id}>
                                    <span>{product.name}</span>
                                </Link>

                                <div className="row col-12 col-lg-3 my-2">
                                    <div className="col-4">
                                        <button className="custom-button font-weight-bold font-size-small"
                                                onClick={() => decreaseQuantity(cartProduct)}>
                                            <i className="pi pi-minus"/>
                                        </button>
                                    </div>
                                    <div className="col-5">{quantity} db</div>
                                    <div className="col-3">
                                        <button className="custom-button font-weight-bold font-size-small"
                                                onClick={() => increaseQuantity(cartProduct)}>
                                            <i className="pi pi-plus"/>
                                        </button>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-2 my-2 text-right">
                                    {(product.price * quantity).toLocaleString()} Ft
                                </div>
                            </div>
                        );
                    })}

                    <div className="font-size-normal mb-2 pt-2 elements-apart w-100">
                        <span className="font-weight-bold">Összesen</span>
                        <span className="font-weight-bold">{priceSum.toLocaleString()} Ft</span>
                    </div>

                    <button className="custom-button float-right"
                            onClick={goToOrder}>
                        Tovább a megrendeléshez
                    </button>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loadCart: loadCart(dispatch),
    setCart: setCart(dispatch),
});

const mapStateToProps = state => ({
    cartStore: state[CART_STORAGE],
    userStore: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);