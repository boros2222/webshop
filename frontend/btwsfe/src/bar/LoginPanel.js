import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './LoginPanel.css';

class LoginPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleLogin = (event) => {
        event.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
    };

    render() {
        return (
            <div>
                <form className="login-panel" onSubmit={this.handleLogin}>
                        <div className="login-input">
                            <p>Felhasználónév: <input type="text" name="username" value={this.state.username} /></p>
                            <p>Jelszó: <input type="text" name="password" value={this.state.password} /></p>
                        </div>
                        <button>
                            <i className="pi pi-chevron-circle-right"></i>
                        </button>
                        <Link to={"/register"}>Regisztráció</Link>
                </form>
            </div>
        )
    }

}

export default LoginPanel;