import React from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import ProductScroller from "../component/ProductScroller";
import {loadProducts} from "../redux/functions/product-functions";

function Products({productsStore, loadProducts}) {

    const loadProduct = (offset, limit, sortOption) => {
        loadProducts(offset, limit, sortOption);
    };

    return (
        <ProductScroller loadProduct = {loadProduct} productsStore = {productsStore}
                         headerText = "Termékek"/>
    );
}

const mapDispatchToProps = dispatch => ({
    loadProducts: loadProducts(dispatch)
});
const mapStateToProps = state => ({
    productsStore: state[PRODUCTS]
});
export default connect(mapStateToProps, mapDispatchToProps)(Products);