import React, {useEffect} from 'react';
import {CATEGORY, PRODUCTS} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore} from "../redux/actions/request";
import ProductScroller from "../component/ProductScroller";
import {RESET} from "../redux/constants/action-types";

function CategoryProducts({categoryId, categoriesStore, productsStore, loadCategories, getProducts}) {

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
        getProducts(categoryId, offset, limit, sortOption);
    };

    return (
        <ProductScroller loadProduct = {loadProduct} productsStore = {productsStore}
                         headerText = {<>Termékek a kategóriában: <span className="font-weight-bold">{findCategoryName()}</span></>}/>
    );
}

const mapDispatchToProps = dispatch => ({
    loadCategories: () => {
        dispatch(fetchToStore(CATEGORY, "/category/list", true))
    },
    getProducts: (categoryId, offset, limit, sortOption) => {
        dispatch(fetchToStore(PRODUCTS, `/product/category/${categoryId}/${offset}/${limit}/${sortOption}`, false, () => {
            dispatch({type: `${PRODUCTS}/${RESET}`})
        }))
    }
});
const mapStateToProps = state => ({
    categoriesStore: state[CATEGORY],
    productsStore: state[PRODUCTS]
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts);