import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {CURRENT_USER, PRODUCT_DETAILS, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import ProductForm from "../component/ProductForm";
import {editProduct, loadProduct} from "../redux/functions/product-functions";

function EditProduct({id, userStore, responseStore, editProduct, loadProduct, productDetailsStore}) {

    const history = useHistory();

    useEffect(() => {
        loadProduct(id);
    }, [loadProduct, id]);

    if (!userStore.isAdmin()) {
        return <p>Csak admin jogosultsággal szerkeszthető egy termék!</p>
    }

    if (!productDetailsStore.isReady()) {
        return productDetailsStore.getMessage();
    }

    const onSubmit = (product, resetForm) => {
        const formData = new FormData();
        formData.set("id", productDetailsStore.data.id);
        formData.set("name", product.name);
        formData.set("shortDescription", product.shortDescription);
        formData.set("description", product.description);
        formData.set("price", product.price);
        formData.set("category", product.category);
        product.files.filter(file => file.id == null).forEach(file => formData.append("files", file));
        product.files.filter(file => file.id != null).map(file => file.path).forEach(file => formData.append("existingFiles", file));
        editProduct(formData).then(() => history.push(`/product/${productDetailsStore.data.id}`));
    };

    let message = responseStore.getMessage();

    return (
        <div className="w-100">
            <p className="font-weight-bold font-size-medium">Termék szerkesztése</p>
            <ProductForm product={productDetailsStore.data} onSubmit={onSubmit} buttonLabel="Mentés"/>
            <button onClick={() => history.push(`/product/${productDetailsStore.data.id}`)}
                    className="custom-button font-weight-bold">
                Vissza a termékhez
            </button>
            <div className="mt-2 primary-color">
                <p className="font-weight-bold">{message}</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loadProduct: loadProduct(dispatch),
    editProduct: editProduct(dispatch)
});
const mapStateToProps = state => ({
    productDetailsStore: state[PRODUCT_DETAILS],
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);