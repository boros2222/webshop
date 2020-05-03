import React, {useState} from 'react';
import {CART_STORAGE, CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {getFromStorage, removeFromStorage} from "../redux/actions/storage";
import {Link} from "react-router-dom";
import {sendToBackend} from "../redux/actions/request";
import {Accordion, AccordionTab} from 'primereact/accordion';
import {useForm} from "react-hook-form";
import Address from "../component/Address";

function Order({cartStore, userStore, responseStore, placeOrder}) {

    const PRODUCTS_TAB = 0;
    const PERSONAL_INFO_TAB = 1;
    const SHIPPING_ADDRESS_TAB = 2;

    const [activeIndex, setActiveIndex] = useState(PRODUCTS_TAB);
    const {register, handleSubmit, errors, triggerValidation} = useForm();

    const submitOrder = (order) => {
        order.userAccount = {id: userStore.data.id};
        order.orderedProducts =  [...cartStore.data];
        placeOrder(order);
    };

    const previousTab = () => {
        if (activeIndex > PRODUCTS_TAB) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const nextTab = () => {
        validateOnNextTab().then(valid => {
            if (valid && activeIndex < SHIPPING_ADDRESS_TAB) {
                setActiveIndex(activeIndex + 1);
            }
        })
    };

    const validateOnNextTab = async () => {
        if (activeIndex === PERSONAL_INFO_TAB) {
            return await triggerValidation("invoiceName") &&
                await triggerValidation("invoiceAddress.postalCode") &&
                await triggerValidation("invoiceAddress.city") &&
                await triggerValidation("invoiceAddress.street") &&
                await triggerValidation("invoiceAddress.houseNumber");
        }
        return true;
    };

    if (userStore.error !== undefined) {
        return <p>Előbb jelentkezz be!</p>
    }

    let message = undefined;
    if (responseStore.error !== undefined) {
        message = responseStore.data.message;
    } else if (responseStore.isFetching === true) {
        message = <i className="pi pi-spin pi-spinner font-size-large"/>;
    } else if (responseStore.fetchedAlready === true) {
        message = responseStore.data.message;
    }

    const cart = cartStore.data;
    if (cart === null || cart === undefined || cart.length === 0) {
        return (
            <div>
                <div className="mt-2 primary-color">
                    <p className="font-weight-bold">{message}</p>
                </div>
                <p>A kosár üres!</p>
            </div>
        );
    }

    const user = userStore.data;
    const priceSum = cart.map(cartProduct => cartProduct.product.price * cartProduct.quantity).reduce((a, b) => a + b, 0);
    return (
        <>
            <p className="font-weight-bold font-size-medium mb-3">Megrendelés leadása</p>
            <form className="order-page" onSubmit={(event) => event.preventDefault()}>
                <Accordion activeIndex={activeIndex}
                           onTabChange={(event) => setActiveIndex(event.index)}>
                    <AccordionTab header="Megrendelendő termékek" disabled={true}>

                        <div className="primary-color w-100">
                            {cart.map(cartProduct => {
                                let product = cartProduct.product;
                                let quantity = cartProduct.quantity;
                                return (
                                    <div key={product.id} className="row cart-product">
                                        <Link className="col-12 col-lg-8 my-2" to={"/product/" + product.id}>
                                            <span>{product.name}</span>
                                        </Link>
                                        <div className="col-6 col-lg-2 my-2">{quantity} db</div>
                                        <div className="col-6 col-lg-2 my-2 text-right">
                                            {(product.price * quantity).toLocaleString()} Ft
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="cart-product elements-apart w-100">
                                <span className="font-weight-bold">Összesen</span>
                                <span className="font-weight-bold">{priceSum.toLocaleString()} Ft</span>
                            </div>
                        </div>

                    </AccordionTab>
                    <AccordionTab header="Személyes adatok" disabled={true}>

                        <div className="row">
                            <div className="col-12 col-lg-6 primary-color">
                                <p className="col-12 col-lg-6 d-inline-block pl-0 required">Számlázási név:</p>
                                <input className="col-12 col-lg-6" type="text" name="invoiceName"
                                       defaultValue={user && user.name ? user.name : ""}
                                       ref={register({required: true})}/>
                                {errors.invoiceName && errors.invoiceName.type === 'required' && <p className="col-12 error-message">Számlázási név megadása kötelező</p>}
                            </div>


                            <div className="col-12 col-lg-6 primary-color">
                                <p className="col-12 col-lg-6 d-inline-block pl-0">Email cím:</p>
                                <input className="col-12 col-lg-6" type="text" name="email"
                                       defaultValue={user && user.email ? user.email : ""} disabled={true}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <p className="font-weight-bold mt-2 font-size-normal">Számlázási cím:</p>
                                <Address addressName="invoiceAddress" register={register} errors={errors} required={true}
                                         address={user && user.invoiceAddress ? user.invoiceAddress : ""}/>
                            </div>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="Szállítási cím" disabled={true}>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <p className="font-weight-bold mt-2 font-size-normal">Szállítási cím:</p>
                                <Address addressName="shippingAddress" register={register} errors={errors} required={true}
                                         address={user && user.shippingAddress ? user.shippingAddress : ""}/>
                            </div>
                        </div>
                    </AccordionTab>
                </Accordion>
                <div className="w-100 mt-4">
                    <button type="button" className="custom-button"
                            onClick={previousTab}>
                        Vissza
                    </button>
                    {activeIndex === 2 ?
                        <button type="submit" className="custom-button-inverse float-right"
                                onClick={handleSubmit(submitOrder)}>
                            Megrendelés
                        </button>
                        :
                        <button type="button" className="custom-button-inverse float-right"
                                onClick={nextTab}>
                            Tovább
                        </button>
                    }
                </div>
                <div className="col-12 mt-2 primary-color">
                    <p className="font-weight-bold">{message}</p>
                </div>
            </form>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    const emptyCart = () => removeFromStorage(constants.CART_STORAGE_NAME, {
        callback: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_STORAGE_NAME))
    });
    return {
        placeOrder: (order) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/order/new", order, emptyCart))
    }
};

const mapStateToProps = state => ({
    cartStore: state[CART_STORAGE],
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(Order);