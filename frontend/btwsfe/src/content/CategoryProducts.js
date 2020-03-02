import React from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import ProductScroller from "../component/ProductScroller";
import {RESET} from "../redux/constants/action-types";

function CategoryProducts(props) {

    const loadProduct = (offset, limit) => {
        props.getProducts(props.categoryId, offset, limit);
    };

    return (
        <ProductScroller loadProduct = {loadProduct} products = {props.products}
                         headerText = {"Termékek a kategóriában"}/>
    );
}

const mapDispatchToProps = dispatch => ({
    getProducts: (categoryId, offset, limit) => {
        dispatch(fetchToStore(PRODUCTS, `/product/category/${categoryId}/${offset}/${limit}`, false, () => {
            dispatch({type: `${PRODUCTS}/${RESET}`})
        }))
    }
});
const mapStateToProps = state => ({
        products: state[PRODUCTS]
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts);