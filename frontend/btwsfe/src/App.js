import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import MainLayout from './layouts/MainLayout';

import Products from './content/Products';
import ProductDetails from './content/ProductDetails';


class App extends React.Component {

  render() {
    return (
      <Router>

        <Route exact path={["/","/products"]} render={(props) => <MainLayout content={<Products />} {...props} /> } />
        <Route exact path="/product/:id" render={(props) => <MainLayout content={<ProductDetails id={props.match.params.id} />} {...props} /> } />

      </Router>
    )
  }

}

export default App;
