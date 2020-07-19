import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import Products from './content/Products';
import ProductDetails from './content/ProductDetails';
import {connect} from "react-redux";
import Register from "./content/Register";
import CartDetails from "./content/CartDetails";
import Order from "./content/Order";
import SearchResult from "./content/SearchResult";
import CategoryProducts from "./content/CategoryProducts";
import UserSettings from "./content/UserSettings";
import UserOrders from "./content/UserOrders";
import NewProduct from "./content/NewProduct";
import EditProduct from "./content/EditProduct";
import About from "./content/About";
import Users from "./content/Users";
import ActivateUser from "./content/ActivateUser";
import ForgotPassword from "./content/ForgotPassword";
import {loadTheme} from "./redux/functions/theme-functions";
import {loadCart} from "./redux/functions/cart-functions";
import {loadCurrentUser} from "./redux/functions/user-functions";
import {resetStore} from "./redux/functions/generic-functions";
import {RESPONSE_MESSAGE} from "./redux/constants/namespaces";

function App({loadCurrentUser, loadCart, loadTheme, resetMessage}) {

    useEffect(() => {
        loadTheme();
    }, [loadTheme]);

    return (
        <Router>
            <Route exact path = "*" render = {() => {
                resetMessage();
                loadCurrentUser();
                loadCart();
            }}/>

            <Switch>
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

                <Route exact path = "/register" render = {(props) =>
                    <MainLayout content = {
                        <Register />
                    } {...props} />
                }/>

                <Route exact path = "/cart" render = {(props) =>
                    <MainLayout content = {
                        <CartDetails />
                    } {...props} />
                }/>

                <Route exact path = "/order" render = {(props) =>
                    <MainLayout content = {
                        <Order />
                    } {...props} />
                }/>

                <Route exact path = {["/search/:searchTerm", "/search/"]} render = {(props) =>
                    <MainLayout content = {
                        <SearchResult key = {props.match.params.searchTerm} searchTerm = {props.match.params.searchTerm} />
                    } {...props} />
                }/>

                <Route exact path = "/category/:id" render = {(props) =>
                    <MainLayout content = {
                        <CategoryProducts key = {props.match.params.id} categoryId = {props.match.params.id} />
                    } {...props} />
                }/>

                <Route exact path = "/settings" render = {(props) =>
                    <MainLayout content = {
                        <UserSettings />
                    } {...props} />
                }/>

                <Route exact path = "/orders" render = {(props) =>
                    <MainLayout content = {
                        <UserOrders />
                    } {...props} />
                }/>

                <Route exact path = "/new-product" render = {(props) =>
                    <MainLayout content = {
                        <NewProduct />
                    } {...props} />
                }/>

                <Route exact path = "/edit-product/:id" render = {(props) =>
                    <MainLayout content = {
                        <EditProduct id = {props.match.params.id} />
                    } {...props} />
                }/>

                <Route exact path = "/users" render = {(props) =>
                    <MainLayout content = {
                        <Users />
                    } {...props} />
                }/>

                <Route exact path = "/about" render = {(props) =>
                    <MainLayout content = {
                        <About />
                    } {...props} />
                }/>

                <Route exact path = {["/forgot-password", "/forgot-password/:newPasswordCode"]} render = {(props) =>
                    <MainLayout content = {
                        <ForgotPassword newPasswordCode = {props.match.params.newPasswordCode} />
                    } {...props} />
                }/>

                <Route exact path = "/activate/:code" render = {(props) =>
                    <MainLayout content = {
                        <ActivateUser code = {props.match.params.code} />
                    } {...props} />
                }/>

                <Route exact path = "*" render = {(props) =>
                    <MainLayout content = {
                        <>A keresett oldal nem található!</>
                    } {...props} />
                }/>
            </Switch>
        </Router>
    )
}

const mapDispatchToProps = dispatch => ({
    loadCurrentUser: loadCurrentUser(dispatch),
    loadCart: loadCart(dispatch),
    loadTheme: loadTheme(dispatch),
    resetMessage: resetStore(dispatch, RESPONSE_MESSAGE)
});
const mapStateToProps = state => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
