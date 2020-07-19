import React, {useEffect} from 'react';
import {CATEGORY, PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import ProductScroller from "../component/ProductScroller";
import {loadCategories, loadProductsByCategory} from "../redux/functions/product-functions";

function CategoryProducts({categoryId, categoriesStore, productsStore, loadCategories, loadProducts}) {

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    const findCategoryName = () => {
        if (categoriesStore.isReady()) {
            const category = categoriesStore.data.find(category => category.id.toString() === categoryId);
            if (category !== undefined) {
                return category.name;
            }
        }
        return "";
    };

    const loadProduct = (offset, limit, sortOption) => {
        loadProducts(categoryId, offset, limit, sortOption);
    };

    return (
        <ProductScroller loadProduct = {loadProduct} productsStore = {productsStore}
                         headerText = {<>Termékek a kategóriában: <span className="font-weight-bold">{findCategoryName()}</span></>}/>
    );
}

const mapDispatchToProps = dispatch => ({
    loadCategories: loadCategories(dispatch),
    loadProducts: loadProductsByCategory(dispatch)
});
const mapStateToProps = state => ({
    categoriesStore: state[CATEGORY],
    productsStore: state[PRODUCTS]
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts);