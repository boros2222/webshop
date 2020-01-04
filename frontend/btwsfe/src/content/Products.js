import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {fetchToStore} from "../redux/actions/generic";
import {PRODUCT} from "../redux/constants/namespaces";
import {connect} from "react-redux";

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
                <p>Betöltés alatt...</p>
            )
        } else if (products.fetchedAlready === true) {
            return (
                <ul>
                    {
                        products.data.map(product => {
                            return (
                                <li key={product.id}>
                                    <Link to={"/product/" + product.id}>{product.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        } else {
            return null;
        }
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => {
            dispatch(fetchToStore(PRODUCT, "/product/list", false))
        }
    };
};
const mapStateToProps = state => {
    return {
        products: state[PRODUCT]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);