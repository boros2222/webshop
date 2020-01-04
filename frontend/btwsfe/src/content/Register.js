import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {sendToBackend} from "../redux/actions/generic";
import {AUTHENTICATION} from "../redux/constants/namespaces";
import {connect} from "react-redux";

class Register extends Component {

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { products } = this.props;
        if (products.error !== undefined) {
            return (
                <p>{products.data.message}</p>
            )
        } else if (products.isFetching === true) {
            return (
                <p>Betöltés alatt...</p>
            )
        } else if (products.fetchedAlready === true) {
            return (
                <ul>
                    {
                        products.data.map(product => {
                            return (
                                <li key={product.id}>
                                    <Link to={"/product/" + product.id}>{product.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        } else {
            return null;
        }
    }

}

const mapDispatchToProps = dispatch => ({
    register: (user) => dispatch(sendToBackend(AUTHENTICATION, "/user/register", user))
});
const mapStateToProps = state => ({
    auth: state[AUTHENTICATION]
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);