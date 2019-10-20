import React, { Component } from 'react';
import axios from 'axios';

import constants from '../Constants';

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: "",
                description: [],
                price: 0
            }
        }
    }

    componentDidMount() {
        axios.get(`${constants.backendUrl}/product/${this.props.id}`).then(res => {
            res.data.description = res.data.description.split("\\n");
            this.setState({
                product: res.data
            });
            
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>{this.state.product.name}</h1>
                {
                    this.state.product.description.map(desc => {
                        return <p>{desc}</p>
                    })
                }
                <p>{this.state.product.price}</p>
            </React.Fragment>
        )
    }

}

export default ProductDetails;