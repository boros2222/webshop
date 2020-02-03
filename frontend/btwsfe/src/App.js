import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

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

class App extends React.Component {

    componentDidMount() {
        this.props.getCurrentUser();
        this.props.getCart();
    }

    render() {
        return (
            <Router>
                <Route exact path = {["/", "/products"]}
                       render = { (props) =>
                           <MainLayout content = {<Products />} {...props} />
                       }
                />

                <Route exact path = "/product/:id"
                       render = { (props) =>
                           <MainLayout content = {<ProductDetails id = {props.match.params.id} />} {...props} />
                       }
                />

                <Route exact path = {["/register"]}
                       render = { (props) =>
                           <MainLayout content = {<Register />} {...props} />
                       }
                />

                <Route exact path = {["/cart"]}
                       render = { (props) =>
                           <MainLayout content = {<CartDetails />} {...props} />
                       }
                />
            </Router>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(fetchToStore(CURRENT_USER, "/user/current", false)),
    getCart: () => dispatch(getFromStorage(CART_STORAGE, constants.CART_COOKIE_NAME))
});

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
