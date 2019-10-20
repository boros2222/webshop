import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import constants from '../Constants';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get(`${constants.backendUrl}/product/list`).then(res => {
            this.setState({
                products: res.data
            });
        });
    }

    render() {
        return (
            <ul>
                {
                    this.state.products.map(product => {
                        return (
                            <li key={product.id}>
                                <Link to={"/product/" + product.id}>{product.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

}

export default Products;