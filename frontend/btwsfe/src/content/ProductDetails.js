import React, {Component} from 'react';
import {CART_STORAGE, PRODUCT_DETAILS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {Growl} from 'primereact/growl';
import {fetchToStore} from "../redux/actions/request";
import {getFromStorage, saveToStorage} from "../redux/actions/storage";

class ProductDetails extends Component {

    componentDidMount() {
        this.props.getProduct(this.props.id);
    }

    addToCart = () => {
        const product = this.props.productDetails.data;

        if (product !== undefined) {
            let cart = this.props.cart.data;
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
                this.props.setCart(cart);
                this.growl.show({severity: "success", summary: "Kosár", detail: "Termék hozzáadva a kosárhoz!"});
            } else {
                this.growl.show({severity: "info", summary: "Kosár", detail: "A termék már szerepel a kosárban!"});
            }
        }
    };

    render() {
        const { productDetails } = this.props;
        if (productDetails.error !== undefined) {
            return (
                <p>{productDetails.data.message}</p>
            )
        } else if (productDetails.isFetching === true) {
            return (
                <i className="pi pi-spin pi-spinner" style={{'fontSize': '2.5em'}}/>
            )
        } else if (productDetails.fetchedAlready === true) {
            const product = productDetails.data;
            return (
                <React.Fragment>
                    <Growl ref={(el) => this.growl = el} />
                    <h1>{product.name}</h1>
                    {
                        product.description.split("\\n").map(desc => {
                            return <p>{desc}</p>
                        })
                    }
                    <p>{product.price}</p>
                    <button onClick={this.addToCart} className="custom-button">Hozzáadás a kosárhoz</button>
                </React.Fragment>
            )
        } else {
            return null;
        }
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getProduct: (productId) => {
            dispatch(fetchToStore(PRODUCT_DETAILS, `/product/${productId}`, false))
        },
        setCart: (data) => saveToStorage(constants.CART_STORAGE_NAME, data, {
            callback: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_STORAGE_NAME))
        }),
    };
};
const mapStateToProps = state => {
    return {
        productDetails: state[PRODUCT_DETAILS],
        cart: state[CART_STORAGE]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);