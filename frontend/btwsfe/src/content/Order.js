import React, {Component, Fragment} from 'react';
import {CART_STORAGE, CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {Growl} from "primereact/growl";
import "./CartDetails.css";
import {getFromStorage, removeFromStorage} from "../redux/actions/storage";
import {Link} from "react-router-dom";
import {sendToBackend} from "../redux/actions/request";
import {RESET} from "../redux/constants/action-types";
import {Accordion,AccordionTab} from 'primereact/accordion';

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            order: {
                userAccount: {
                    id: undefined
                },
                shippingAddress: {
                    postalCode: "",
                    city: "",
                    street: "",
                    houseNumber: ""
                },
                orderedProducts: []
            }
        }
    }

    previousTab = () => {
        const currentIndex = this.state.activeIndex;
        if (currentIndex > 0) {
            this.setState({
                activeIndex: currentIndex - 1
            });
        }
    };

    nextTab = () => {
        const currentIndex = this.state.activeIndex;
        if (currentIndex < 2) {
            this.setState({
                activeIndex: currentIndex + 1
            });
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
            const priceSum = cart.map(cartProduct => cartProduct.product.price * cartProduct.quantity).reduce((a, b) => a + b, 0);
            return (
                <Fragment>
                    <Accordion activeIndex={this.state.activeIndex}
                               onTabChange={(e) => this.setState({activeIndex: e.index})}>
                        <AccordionTab header="Megrendelendő termékek" disabled={true}>

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
                                            <span>{quantity} db</span>
                                            <span>{(product.price * quantity).toLocaleString()} Ft</span>
                                        </span>
                                        </div>
                                    );
                                })}

                                <div className="cart-product elements-apart max-width">
                                    <span className="bold">Összesen</span>
                                    <span className="bold">{priceSum.toLocaleString()} Ft</span>
                                </div>
                            </div>

                        </AccordionTab>
                        <AccordionTab header="Személyes adatok" disabled={true}>
                            Lorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasd
                        </AccordionTab>
                        <AccordionTab header="Fizetési opciók" disabled={true}>
                            Lorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasdLorem ipsum asddda das das asdasdasd
                        </AccordionTab>
                    </Accordion>
                    <div className="button-row">
                        <button className="custom-button"
                                onClick={this.previousTab}>
                            Vissza
                        </button>
                        <button className="custom-button-inverse pull-right"
                                onClick={this.nextTab}>
                            Tovább
                        </button>
                    </div>
                </Fragment>
            );
        }
    }
}

const mapDispatchToProps = dispatch => ({
    emptyCart: () => removeFromStorage(constants.CART_STORAGE_NAME, {
        callback: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_STORAGE_NAME))
    }),
    placeOrder: (order) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/order/new", order)),
    reset: () => dispatch({
        type: `${RESPONSE_MESSAGE}/${RESET}`
    })
});

const mapStateToProps = state => ({
    cart: state[CART_STORAGE],
    user: state[CURRENT_USER],
    response: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(Order);