import React from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import ProductScroller from "../component/ProductScroller";
import {RESET} from "../redux/constants/action-types";

function Products({productsStore, getProducts}) {

    const loadProduct = (offset, limit, sortOption) => {
        getProducts(offset, limit, sortOption);
    };

    return (
        <ProductScroller loadProduct = {loadProduct} productsStore = {productsStore}
                         headerText = "Termékek"/>
    );
}

const mapDispatchToProps = dispatch => ({
    getProducts: (offset, limit, sortOption) => {
        dispatch(fetchToStore(PRODUCTS, `/product/${offset}/${limit}/${sortOption}`, false, () => {
            dispatch({type: `${PRODUCTS}/${RESET}`})
        }))
    }
});
const mapStateToProps = state => ({
    productsStore: state[PRODUCTS]
});
export default connect(mapStateToProps, mapDispatchToProps)(Products);