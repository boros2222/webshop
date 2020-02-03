import React, {Component, Fragment} from 'react';
import {RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import Address from "../component/Address";
import "./Register.css";
import {RESET} from "../redux/constants/action-types";
import {sendToBackend} from "../redux/actions/request";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                invoiceAddress: {
                    postalCode: "",
                    city: "",
                    street: "",
                    houseNumber: ""
                },
                shippingAddress: {
                    postalCode: "",
                    city: "",
                    street: "",
                    houseNumber: ""
                },
                password: ""
            },
            shippingIsSame: false,
            passwordAgain: "",
            message: ""
        }
    }

    componentDidMount() {
        this.props.reset();
    }

    handleInvoiceAddressChange = (event) => {
        this.refreshUser(event, "invoiceAddress");
    };

    handleShippingAddressChange = (event) => {
        this.refreshUser(event, "shippingAddress");
    };

    handleInputChange = (event) => {
        const target = event.target;
        const field = target.name;
        if (["shippingIsSame", "passwordAgain"].includes(field)) {
            const value = target.type === 'checkbox' ? target.checked : target.value;
            this.setState({
                [field]: value
            });
        } else {
            this.refreshUser(event);
        }
    };

    refreshUser = (event, objectName = undefined) => {
        const user = this.state.user;
        const value = event.target.value;
        const field = event.target.name;

        if (objectName !== undefined) {
            user[objectName][field] = value;
        } else {
            user[field] = value;
        }
        this.setState({
            user: user
        });
    };

    handleRegister = (event) => {
        event.preventDefault();
        if (this.validateUser()) {
            const user = this.state.user;
            if (this.state.shippingIsSame) {
                user.shippingAddress = user.invoiceAddress;
            }
            this.props.register(user);
        }
    };

    validateUser = () => {
        let message = "";
        let success = false;
        if (this.state.user.password !== this.state.passwordAgain) {
            message = "Nem egyezik a két jelszó!";
        } else if (this.state.user.password.length < 8) {
            message = "A jelszónak legalább 8 karakternek kell lennie!";
        } else {
            success = true;
        }
        this.setState({
            message: message
        });
        return success;
    };

    render() {
        let shippingAddress = undefined;
        if (this.state.shippingIsSame === false) {
            shippingAddress = (
                <Fragment>
                    <p>Szállítási cím:</p>
                    <Address address={this.state.user.shippingAddress}
                             handleInputChange={this.handleShippingAddressChange}/>
                </Fragment>
            );
        }

        let message = this.state.message;
        const { response } = this.props;
        if (response.error !== undefined) {
            message = response.data.message;
        } else if (response.isFetching === true) {
            message = "Regisztráció folyamatban...";
        } else if (response.fetchedAlready === true) {
            message = response.data.message;
        }

        return (
            <div className="primary-color register-panel">
                <form className="primary-color" onSubmit={this.handleRegister}>
                    <div className="primary-color">
                        <p className="required">Teljes név:</p>
                        <input type="text" name="name" required={true}
                               value={this.state.user.name}
                               onChange={this.handleInputChange}/>

                        <p className="required">Email cím:</p>
                        <input type="email" name="email" required={true}
                               value={this.state.user.email}
                               onChange={this.handleInputChange}/>

                        <p className="required">Jelszó:</p>
                        <input type="password" name="password" required={true}
                               value={this.state.user.password}
                               onChange={this.handleInputChange}/>

                        <p className="required">Jelszó újra:</p>
                        <input type="password" name="passwordAgain" required={true}
                               value={this.state.passwordAgain}
                               onChange={this.handleInputChange}/>

                        <p>Számlázási cím:</p>
                       <Address address={this.state.user.invoiceAddress}
                                handleInputChange={this.handleInvoiceAddressChange}/>

                        <p style={{
                            marginTop: "2em",
                            fontWeight: "bold"
                        }}>
                            Szállítási cím megegyezik a számlázási címmel:
                            <input name="shippingIsSame" type="checkbox"
                                   checked={this.state.shippingIsSame}
                                   onChange={this.handleInputChange} />
                        </p>

                        {shippingAddress}
                    </div>

                    <button className="custom-button flex-center">
                        Regisztráció
                    </button>
                </form>
                <p>{message}</p>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    register: (user) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/user/register", user)),
    reset: () => dispatch({
        type: `${RESPONSE_MESSAGE}/${RESET}`
    })
});
const mapStateToProps = state => ({
    response: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);