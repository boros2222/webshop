import React, {Component} from 'react';
import {fetchToStore} from "../redux/actions/generic";
import {PRODUCT_DETAILS} from "../redux/constants/namespaces";
import {connect} from "react-redux";

class ProductDetails extends Component {

    componentDidMount() {
        this.props.getProduct(this.props.id);
    }

    render() {
        const { productDetails } = this.props;
        if (productDetails.error !== undefined) {
            return (
                <p>{productDetails.data.message}</p>
            )
        } else if (productDetails.isFetching === true) {
            return (
                <p>Betöltés alatt...</p>
            )
        } else if (productDetails.fetchedAlready === true) {
            const product = productDetails.data;
            return (
                <React.Fragment>
                    <h1>{product.name}</h1>
                    {
                        product.description.split("\\n").map(desc => {
                            return <p>{desc}</p>
                        })
                    }
                    <p>{product.price}</p>
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
        }
    };
};
const mapStateToProps = state => {
    return {
        productDetails: state[PRODUCT_DETAILS]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);