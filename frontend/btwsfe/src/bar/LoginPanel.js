import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './LoginPanel.css';
import {RESPONSE_MESSAGE, CURRENT_USER} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {RESET} from "../redux/constants/action-types";
import {fetchToStore, sendToBackend} from "../redux/actions/request";
import {removeCookie} from "../redux/actions/cookie";

class LoginPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: " ",
                email: "",
                password: "",
            }
        }
    }

    componentDidMount() {
        this.props.reset();
    }

    handleInputChange = (event) => {
        const user = this.state.user;
        const value = event.target.value;
        const field = event.target.name;
        user[field] = value;
        this.setState({
            user: user
        });
    };

    handleLogin = (event) => {
        event.preventDefault();
        this.props.login(this.state.user);
    };

    render() {
        const { response, user } = this.props;
        let message = undefined;
        if (response.error !== undefined) {
            message = response.data.message;
        } else if (response.fetchedAlready === true) {
            message = response.data.message;
        }

        if (user.error === undefined && user.data !== undefined) {
            return (
                <div className="secondary-darker-color">
                    <span>Bejelentkezett felhasználó: {user.data.email}</span>
                    <button className="custom-button" onClick={() => this.props.logout()}>Kijelentkezés</button>
                </div>
            )
        } else {
            return (
                <div className="secondary-darker-color">
                    <form className="login-panel secondary-darker-color" onSubmit={this.handleLogin}>
                        <div className="login-input secondary-darker-color">
                            <p>Email cím:</p>
                            <input type="email" name="email" required={true}
                                   value={this.state.user.email}
                                   onChange={this.handleInputChange}/>
                            <p>Jelszó:</p>
                            <input type="password" name="password" required={true}
                                   value={this.state.user.password}
                                   onChange={this.handleInputChange}/>
                        </div>
                        <button className="login-button custom-button flex-center">
                            Belépés <i className="pi pi-chevron-circle-right"/>
                        </button>
                        <div className="secondary-darker-color">
                            <Link className="block-link" to={"/register"}>Regisztráció</Link>
                            <Link className="block-link" to={"/forgot-password"}>Elfelejtett jelszó</Link>
                        </div>
                    </form>

                    { response.isFetching === true ? <i className="pi pi-spin pi-spinner" style={{'fontSize': '2.5em'}}/> : null }
                    <p>{message}</p>
                </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/user/login", user, () => {
        dispatch(fetchToStore(CURRENT_USER, "/user/current", false));
        dispatch({
            type: `${RESPONSE_MESSAGE}/${RESET}`
        });
    })),
    logout: () => removeCookie(constants.AUTH_COOKIE_NAME, {
        path: `${constants.API_PATH}/`,
        callback: () => dispatch(fetchToStore(CURRENT_USER, "/user/current", false))
    }),
    reset: () => dispatch({
        type: `${RESPONSE_MESSAGE}/${RESET}`
    })
});

const mapStateToProps = state => ({
    response: state[RESPONSE_MESSAGE],
    user: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);