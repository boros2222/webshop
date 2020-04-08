import React from 'react';
import {Link} from "react-router-dom";

function Product({product}) {
    return (
        <div className="row py-5">
            <div className="col-12 col-lg-3 primary-color">
                <Link className="d-block d-lg-none" to={"/product/" + product.id}>
                    <span className="font-size-medium">{product.name}</span>
                </Link>
                <img className="w-100" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt=""/>
            </div>
            <div className="col-12 col-lg-7 w-100 h-100 primary-color">
                <Link className="d-none d-lg-block" to={"/product/" + product.id}>
                    <span className="font-size-medium">{product.name}</span>
                </Link>
                <div className="mt-1 primary-color">
                    Phasellus dignissim eu dui non condimentum. Nunc vitae nisl metus. Suspendisse a mollis diam. Suspendisse sollicitudin, metus vitae semper malesuada, odio nunc bibendum nisl, ac volutpat velit elit vitae erat. Maecenas luctus aliquet lacus, vitae rhoncus diam semper auctor. Integer accumsan massa purus, eu sodales dui sollicitudin non.
                </div>
                <div className="mt-1 primary-color">
                    Kategória:
                    <Link className="ml-2" to={`/category/${product.category.id}`}>{product.category.name}</Link>
                </div>
            </div>
            <div className="col-12 col-lg-2 align-self-center font-size-medium text-right">
                {product.price.toLocaleString()} Ft
            </div>
        </div>
    )
}

export default Product;