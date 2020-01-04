import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './LoginPanel.css';
import {fetchToStore, removeCookie, sendToBackend} from "../redux/actions/generic";
import {AUTHENTICATION, CURRENT_USER} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {RESET} from "../redux/constants/action-types";

class LoginPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: " ",
            password: " ",
        }
    }

    handleLogin = (event) => {
        event.preventDefault();
        let user = {
            name: " ",
            email: this.state.email,
            password: this.state.password
        };
        this.props.login(user);
    };

    render() {
        const { auth, user } = this.props;
        let message = undefined;
        if (auth.error !== undefined) {
            message = auth.data.message;
        } else if (auth.isFetching === true) {
            message = "Belépés...";
        } else if (auth.fetchedAlready === true) {
            message = auth.data.message;
        }

        if (user.error === undefined && user.data !== undefined) {
            return (
                <React.Fragment>
                    <p>Bejelentkezett felhasználó: {user.data.email}</p>
                    <button className="navbar-button" onClick={() => this.props.logout()}>Kijelentkezés</button>
                </React.Fragment>
            )
        } else {
            return (
                <div>
                    <form className="login-panel" onSubmit={this.handleLogin}>
                        <div className="login-input">
                            <p>Email cím:
                                <input type="email"
                                       name="email"
                                       required={true}
                                       onChange={e => this.setState({email: e.target.value})}/>
                            </p>
                            <p>Jelszó:
                                <input type="password"
                                       name="password"
                                       required={true}
                                       onChange={e => this.setState({password: e.target.value})}/>
                            </p>
                        </div>
                        <button>
                            <i className="pi pi-chevron-circle-right"/>
                        </button>
                        <Link to={"/register"}>Regisztráció</Link>
                    </form>
                    <p>{message}</p>
                </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(sendToBackend(AUTHENTICATION, "/user/login", user, () => {
        dispatch(fetchToStore(CURRENT_USER, "/user/current", false));
        dispatch({
            type: `${AUTHENTICATION}/${RESET}`
        });
    })),
    logout: () => removeCookie(constants.AUTH_COOKIE_NAME, () => {
        dispatch(fetchToStore(CURRENT_USER, "/user/current", false));
    })
});

const mapStateToProps = state => ({
    auth: state[AUTHENTICATION],
    user: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);