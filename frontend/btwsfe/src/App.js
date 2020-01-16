import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import MainLayout from './layout/MainLayout';
import Products from './content/Products';
import ProductDetails from './content/ProductDetails';
import {fetchToStore} from "./redux/actions/generic";
import {CURRENT_USER} from "./redux/constants/namespaces";
import {connect} from "react-redux";
import Register from "./content/Register";

class App extends React.Component {

    componentDidMount() {
        this.props.getCurrentUser();
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
            </Router>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => {dispatch(fetchToStore(CURRENT_USER, "/user/current", false))}
});

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
