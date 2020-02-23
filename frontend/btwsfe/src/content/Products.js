import React, {Component} from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import ProductScroller from "../component/ProductScroller";

class Products extends Component {

    loadProduct = (offset, limit) => {
        return this.props.getProducts(offset, limit);
    };

    render() {
        return (
            <ProductScroller loadProduct = {this.loadProduct} products = {this.props.products}
                             headerText = "Termékek"/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: async (offset, limit) => {
            await dispatch(fetchToStore(PRODUCTS, `/product/${offset}/${limit}`, false))
        }
    };
};
const mapStateToProps = state => {
    return {
        products: state[PRODUCTS]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);