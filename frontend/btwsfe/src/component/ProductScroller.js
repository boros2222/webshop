import React, {Component, Fragment} from 'react';
import Product from "../component/Product";
import {DataScroller} from 'primereact/datascroller';

class ProductScroller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: 4,
            products: []
        };
    }

    onLazyLoad = (event) => {
        this.loadProductsLazily(event.first, event.rows);
    };

    loadProductsLazily = (offset, limit) => {
        this.props.loadProduct(offset, limit)
            .then(() => {
                if (this.props.products.error === undefined && this.props.products.data !== undefined) {
                    let products = this.state.products.slice();
                    products.push(...this.props.products.data);
                    this.setState({
                        products: products
                    });
                }
            });
    };

    productTemplate = (product) => {
        if (!product) {
            return null;
        }
        return (
            <div className="primary-color">
                <Product key={product.id} product={product} />
            </div>
        )
    };

    render() {
        return (
            <Fragment>
                <div className="max-width">
                    <p style={{fontSize: "1.5em"}}>{this.props.headerText}</p>
                </div>
                <DataScroller value={this.state.products} itemTemplate={this.productTemplate}
                              rows={this.state.rows} lazy={true} onLazyLoad={this.onLazyLoad} />
            </Fragment>
        );
    }
}

export default ProductScroller;