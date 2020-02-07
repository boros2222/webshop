import React, {Component, Fragment} from 'react';
import {PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import Product from "../component/Product";
import {fetchToStore} from "../redux/actions/request";

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            limit: 10
        };
    }

    componentDidMount() {
        this.props.getProducts(this.state.offset, this.state.limit);
    }

    nextPage = () => {
        this.setState({
            offset: this.state.offset + this.state.limit
        });
        this.props.getProducts(this.state.offset, this.state.limit);
    };

    previousPage = () => {
        this.setState({
            offset: this.state.offset - this.state.limit
        });
        this.props.getProducts(this.state.offset, this.state.limit);
    };

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
                <Fragment>
                    {products.data.map(product => {
                        return (
                            <Product key={product.id} product={product} />
                        )
                    })}
                    <button className="custom-button" onClick={this.previousPage}>Előző oldal</button>
                    <button className="custom-button" onClick={this.nextPage}>Következő oldal</button>
                </Fragment>
            )
        } else {
            return null;
        }
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: (offset, limit) => {
            dispatch(fetchToStore(PRODUCTS, `/product/${offset}/${limit}`, false))
        }
    };
};
const mapStateToProps = state => {
    return {
        products: state[PRODUCTS]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);