import React, {useEffect, useState} from 'react';
import {CART_STORAGE, PRODUCT_DETAILS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {Growl} from 'primereact/growl';
import {fetchToStore} from "../redux/actions/request";
import {getFromStorage, saveToStorage} from "../redux/actions/storage";

function ProductDetails(props) {

    const [growl, setGrowl] = useState(undefined);

    const { loadProduct } = props;
    useEffect(() => loadProduct(props.id), [loadProduct, props.id]);

    const addToCart = () => {
        const product = props.productDetailsStore.data;

        if (product !== undefined) {
            let cart = props.cartStore.data;
            if (cart === null || cart === undefined) {
                cart = [];
            } else {
                cart = cart.slice();
            }

            if (cart.findIndex(x => x.product.id === product.id) === -1) {
                const cartProduct = {
                    product: {
                        id: product.id,
                        name: product.name,
                        price: product.price
                    },
                    quantity: 1
                };
                cart.push(cartProduct);
                props.setCartStore(cart);
                growl.show({severity: "success", summary: "Kosár", detail: "Termék hozzáadva a kosárhoz!"});
            } else {
                growl.show({severity: "info", summary: "Kosár", detail: "A termék már szerepel a kosárban!"});
            }
        }
    };

    const { productDetailsStore } = props;
    if (productDetailsStore.error !== undefined) {
        return <p>{productDetailsStore.data.message}</p>
    } else if (productDetailsStore.isFetching === true || productDetailsStore.data === undefined) {
        return <i className="pi pi-spin pi-spinner" style={{'fontSize': '2.5em'}}/>
    }

    const product = productDetailsStore.data;
    return (
        <>
            <Growl ref={(el) => setGrowl(el)} />
            <h1>{product.name}</h1>
            {product.description.split("\\n").map(desc => {
                return <p>{desc}</p>
            })}
            <p>{product.price}</p>
            <button onClick={addToCart} className="custom-button">Hozzáadás a kosárhoz</button>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loadProduct: (productId) => {
            dispatch(fetchToStore(PRODUCT_DETAILS, `/product/${productId}`, false))
        },
        setCartStore: (data) => saveToStorage(constants.CART_STORAGE_NAME, data, {
            callback: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_STORAGE_NAME))
        }),
    };
};
const mapStateToProps = state => {
    return {
        productDetailsStore: state[PRODUCT_DETAILS],
        cartStore: state[CART_STORAGE]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);