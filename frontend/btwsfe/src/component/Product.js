import React from 'react';
import {Link} from "react-router-dom";
import "./Product.css";

function Product(props) {
    const { product } = props;
    return (
        <div className="container-fluid product-card">
            <div className="row">
                <div className="col-sm-12 col-lg-3 product-picture">
                    <img className="max-width" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt=""/>
                </div>
                <div className="col-sm-12 col-lg-7 product-text">
                    <Link to={"/product/" + product.id}>
                        <span className="product-title">{product.name}</span>
                    </Link>
                    <div style={{marginTop: "1em"}}>
                        Phasellus dignissim eu dui non condimentum. Nunc vitae nisl metus. Suspendisse a mollis diam. Suspendisse sollicitudin, metus vitae semper malesuada, odio nunc bibendum nisl, ac volutpat velit elit vitae erat. Maecenas luctus aliquet lacus, vitae rhoncus diam semper auctor. Integer accumsan massa purus, eu sodales dui sollicitudin non.
                    </div>
                    <div style={{marginTop: "1em"}}>Kategória: {product.category.name}</div>
                </div>
                <div className="col-sm-12 col-lg-2 product-price text-right">
                    {product.price.toLocaleString()} Ft
                </div>
            </div>
        </div>
    )
}

export default Product;