import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import Products from './content/Products';
import ProductDetails from './content/ProductDetails';
import {CART_STORAGE, CURRENT_USER} from "./redux/constants/namespaces";
import {connect} from "react-redux";
import Register from "./content/Register";
import constants from "./Constants";
import CartDetails from "./content/CartDetails";
import {fetchToStore} from "./redux/actions/request";
import {getFromStorage} from "./redux/actions/storage";
import Order from "./content/Order";
import SearchResult from "./content/SearchResult";
import CategoryProducts from "./content/CategoryProducts";
import UserSettings from "./content/UserSettings";

function App(props) {

    useEffect(() => {
        props.getCurrentUser();
        props.getCart();
    }, [props]);

    return (
        <Router>
            <Route exact path = {["/", "/products"]} render = {(props) =>
                <MainLayout content = {
                    <Products />
                } {...props} />
            }/>

            <Route exact path = "/product/:id" render = {(props) =>
                <MainLayout content = {
                    <ProductDetails id = {props.match.params.id} />
                } {...props} />
            }/>

            <Route exact path = {["/register"]} render = {(props) =>
                <MainLayout content = {
                    <Register />
                } {...props} />
            }/>

            <Route exact path = {["/cart"]} render = {(props) =>
                <MainLayout content = {
                    <CartDetails />
                } {...props} />
            }/>

            <Route exact path = {["/order"]} render = {(props) =>
                <MainLayout content = {
                    <Order />
                } {...props} />
            }/>

            <Route exact path = "/search/:searchTerm" render = {(props) =>
                <MainLayout content = {
                    <SearchResult key = {props.match.params.searchTerm} searchTerm = {props.match.params.searchTerm} />
                } {...props} />
            }/>

            <Route exact path = "/category/:id" render = {(props) =>
                <MainLayout content = {
                    <CategoryProducts key = {props.match.params.id} categoryId = {props.match.params.id} />
                } {...props} />
            }/>

            <Route exact path = {["/settings"]} render = {(props) =>
                <MainLayout content = {
                    <UserSettings />
                } {...props} />
            }/>
        </Router>
    )
}

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(fetchToStore(CURRENT_USER, "/user/current", false)),
    getCart: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_STORAGE_NAME))
});

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
