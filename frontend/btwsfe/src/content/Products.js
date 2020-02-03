import React, {Component} from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import Product from "../component/Product";
import {fetchToStore} from "../redux/actions/request";

class Products extends Component {

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { products } = this.props;
        if (products.error !== undefined) {
            return (
                <p>{products.data.message}</p>
            )
        } else if (products.isFetching === true) {
            return (
                <i className="pi pi-spin pi-spinner" style={{'fontSize': '2.5em'}}/>
            )
        } else if (products.fetchedAlready === true) {
            return (
                products.data.map(product => {
                    return (
                        <Product key={product.id} product={product} />
                    )
                })
            )
        } else {
            return null;
        }
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => {
            dispatch(fetchToStore(PRODUCTS, "/product/list", false))
        }
    };
};
const mapStateToProps = state => {
    return {
        products: state[PRODUCTS]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);