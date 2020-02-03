import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./Product.css";

class Product extends Component {

    render() {
        const product = this.props.product;
        return (
            <div className="product-card">
                <div className="product-image"/>
                <div className="product-text">
                    <Link to={"/product/" + product.id}>
                        <span className="product-title">{product.name}</span>
                    </Link>
                    <div style={{marginTop: "1em"}}>
                        Phasellus dignissim eu dui non condimentum. Nunc vitae nisl metus. Suspendisse a mollis diam. Suspendisse sollicitudin, metus vitae semper malesuada, odio nunc bibendum nisl, ac volutpat velit elit vitae erat. Maecenas luctus aliquet lacus, vitae rhoncus diam semper auctor. Integer accumsan massa purus, eu sodales dui sollicitudin non.
                    </div>
                    <div style={{marginTop: "1em"}}>Kategória: {product.category.name}</div>
                </div>
                <div className="product-price">
                    {product.price.toLocaleString()} Ft
                </div>
            </div>
        )
    }
}

export default Product;