import React, {Component} from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import ProductScroller from "../component/ProductScroller";

class SearchResult extends Component {

    loadProduct = (offset, limit) => {
        return this.props.getProducts(this.props.searchTerm, offset, limit);
    };

    render() {
        return (
            <ProductScroller loadProduct = {this.loadProduct} products = {this.props.products}
                             headerText = {`Keresés eredménye: ${this.props.searchTerm}`}/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: async (searchTerm, offset, limit) => {
            await dispatch(fetchToStore(PRODUCTS, `/product/${searchTerm}/${offset}/${limit}`, false))
        }
    };
};
const mapStateToProps = state => {
    return {
        products: state[PRODUCTS]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);