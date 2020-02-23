import React, {Component, Fragment} from 'react';
import Product from "../component/Product";
import {DataScroller} from 'primereact/datascroller';
import {Dropdown} from "primereact/dropdown";

class ProductScroller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: 4,
            sortOption: undefined,
            products: []
        };
    }

    sortOptions = [
        {label: 'Ár szerint csökkenő', value: 'PRICE_DESC'},
        {label: 'Ár szerint növekvő', value: 'PRICE_ASC'},
    ];

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
            })
            .then(() => this.doSort());
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

    onSort = async (event) => {
        let sortOption = event.value;
        await this.setState({
            sortOption: sortOption
        });
        this.doSort();
    };

    doSort = () => {
        let sortOption = this.state.sortOption;
        if (sortOption === undefined) {
            return;
        }

        let products = this.state.products.slice();
        if (sortOption === 'PRICE_ASC') {
            products.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'PRICE_DESC') {
            products.sort((a, b) => b.price - a.price);
        }

        this.setState({
            products: products
        });
    };

    render() {
        return (
            <Fragment>
                <div className="max-width elements-apart">
                    <p style={{fontSize: "1.5em"}}>{this.props.headerText}</p>
                    <Dropdown value={this.state.sortOption} options={this.sortOptions} onChange={this.onSort} placeholder="Rendezés"/>
                </div>
                <DataScroller value={this.state.products} itemTemplate={this.productTemplate}
                              rows={this.state.rows} lazy={true} onLazyLoad={this.onLazyLoad} />
            </Fragment>
        );
    }
}

export default ProductScroller;