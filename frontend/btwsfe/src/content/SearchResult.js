import React from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import ProductScroller from "../component/ProductScroller";
import {loadProductsBySearch} from "../redux/functions/product-functions";

function SearchResult({searchTerm, productsStore, loadProducts}) {

    const loadProduct = (offset, limit, sortOption) => {
        loadProducts(searchTerm, offset, limit, sortOption);
    };

    return (
        <ProductScroller loadProduct = {loadProduct} productsStore = {productsStore}
                         headerText = {<>Keresés eredménye: <span className="font-weight-bold">{searchTerm}</span></>} />
    );
}

const mapDispatchToProps = dispatch => ({
    loadProducts: loadProductsBySearch(dispatch),
});
const mapStateToProps = state => ({
    productsStore: state[PRODUCTS]
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);