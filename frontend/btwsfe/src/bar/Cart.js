import React, {Component} from 'react';
import {CART_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Cart extends Component {

    render() {
        let cart = this.props.cart.data;

        if (cart === null || cart === undefined || cart.length === 0) {
            return (
                <div className="secondary-darker-color">
                    <p className="navbar-font-size">A kosár üres!</p>
                </div>
            );
        } else {
            const priceSum = cart.map(product => product.price).reduce((a, b) => a + b, 0);
            return (
                <div className="secondary-darker-color">
                    <p className="navbar-font-size" style={{marginBottom: "1em"}}>
                        A kosárban szereplő termékek száma: <span className="bold">{cart.length}</span>
                    </p>
                    <p className="navbar-font-size" style={{marginBottom: "1.5em"}}>
                        Összeg: <span className="bold">{priceSum.toLocaleString()} Ft</span>
                    </p>
                    <Link className="custom-button" to={"/cart"}>
                        <span className="navbar-font-size">Tovább a kosár tartalmához</span>
                    </Link>
                </div>
            );
        }
    }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
    cart: state[CART_STORAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);