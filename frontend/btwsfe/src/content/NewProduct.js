import React from 'react';
import {CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import ProductForm from "../component/ProductForm";
import {newProduct} from "../redux/functions/product-functions";

function NewProduct({userStore, responseStore, newProduct}) {

    if (!userStore.isAdmin()) {
        return <p>Csak admin jogosultsággal adható hozzá új termék!</p>
    }

    const onSubmit = (product, resetForm) => {
        const formData = new FormData();
        formData.set("name", product.name);
        formData.set("shortDescription", product.shortDescription);
        formData.set("description", product.description);
        formData.set("price", product.price);
        formData.set("category", product.category);
        product.files.forEach(file => formData.append("files", file));
        newProduct(formData).then(resetForm);
    };

    let message = responseStore.getMessage();

    return (
        <div className="w-100">
            <p className="font-weight-bold font-size-medium">Új termék hozzáadása</p>
            <ProductForm onSubmit={onSubmit} buttonLabel="Hozzáadás"/>
            <div className="mt-2 primary-color">
                <p className="font-weight-bold">{message}</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    newProduct: newProduct(dispatch)
});
const mapStateToProps = state => ({
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);