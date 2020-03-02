import React from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import ProductScroller from "../component/ProductScroller";
import {RESET} from "../redux/constants/action-types";

function SearchResult(props) {

    const loadProduct = (offset, limit) => {
        props.getProducts(props.searchTerm, offset, limit);
    };

    return (
        <ProductScroller loadProduct = {loadProduct} products = {props.products}
                         headerText = {`Keresés eredménye: ${props.searchTerm}`}/>
    );
}

const mapDispatchToProps = dispatch => ({
    getProducts: (searchTerm, offset, limit) => {
        dispatch(fetchToStore(PRODUCTS, `/product/${searchTerm}/${offset}/${limit}`, false, () => {
            dispatch({type: `${PRODUCTS}/${RESET}`})
        }))
    },
});
const mapStateToProps = state => ({
    products: state[PRODUCTS]
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);