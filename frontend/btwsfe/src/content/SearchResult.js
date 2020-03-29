import React from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import ProductScroller from "../component/ProductScroller";
import {RESET} from "../redux/constants/action-types";

function SearchResult({searchTerm, productsStore, getProducts}) {

    const loadProduct = (offset, limit, sortOption) => {
        getProducts(searchTerm, offset, limit, sortOption);
    };

    return (
        <ProductScroller loadProduct = {loadProduct} productsStore = {productsStore}
                         headerText = {<>Keresés eredménye: <span className="bold">{searchTerm}</span></>} />
    );
}

const mapDispatchToProps = dispatch => ({
    getProducts: (searchTerm, offset, limit, sortOption) => {
        dispatch(fetchToStore(PRODUCTS, `/product/${searchTerm}/${offset}/${limit}/${sortOption}`, false, () => {
            dispatch({type: `${PRODUCTS}/${RESET}`})
        }))
    },
});
const mapStateToProps = state => ({
    productsStore: state[PRODUCTS]
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);