import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import './LoginPanel.css';
import {CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {RESET} from "../redux/constants/action-types";
import {fetchToStore, sendToBackend} from "../redux/actions/request";
import {removeCookie} from "../redux/actions/cookie";
import {useForm} from "react-hook-form";

function LoginPanel({userStore, responseStore, login, logout, reset}) {

    const {register, handleSubmit, errors} = useForm();

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit = (user) => {
        user.name = " ";
        login(user);
    };

    let message = undefined;
    if (responseStore.error !== undefined) {
        message = responseStore.data.message;
    } else if (responseStore.fetchedAlready === true) {
        message = responseStore.data.message;
    }

    if (userStore.isReady()) {
        const user = userStore.data;
        return (
            <div className="container-fluid secondary-darker-color">
                <div className="row">
                    <div className="col-12 col-lg-6 order-1 order-lg-0 secondary-darker-color">
                        <div className="secondary-darker-color space-bottom">
                            <Link className="custom-button" style={{textAlign: "center", display: "inline-block"}} to={"/orders"}>Rendeléseim</Link>
                        </div>
                        <div className="secondary-darker-color space-bottom">
                            <Link className="custom-button" style={{textAlign: "center", display: "inline-block"}} to={"/settings"}>Adataim módosítása</Link>
                        </div>
                        <div className="secondary-darker-color space-bottom">
                            <button className="custom-button" onClick={() => logout()}>Kijelentkezés</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 order-0 order-lg-1 secondary-darker-color">
                        <div className="col-12 col-lg-auto pull-right space-bottom secondary-darker-color" style={{padding: "0"}}>
                            <p style={{fontSize: "1.1em"}}>Üdv, <span className="bold">{user.name}</span>!</p>
                            <p>Email cím: {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container secondary-darker-color">
                <div className="row">
                    <form className="container-fluid secondary-darker-color" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row secondary-darker-color">
                            <div className="col-12 col-lg-5 secondary-darker-color">
                                <div className="row secondary-darker-color" style={{marginBottom: "0.5em"}}>
                                    <p className="col-12 col-lg-4">Email cím:</p>
                                    <input className="col-12 col-lg-8" type="email" name="email"
                                           ref={register({required: "Email cím megadása kötelező"})}/>
                                    <p className="col-12 error-message-secondary">{errors.email && errors.email.message}</p>
                                </div>
                                <div className="row secondary-darker-color">
                                    <p className="col-12 col-lg-4">Jelszó:</p>
                                    <input className="col-12 col-lg-8" type="password" name="password"
                                           ref={register({required: "Jelszó megadása kötelező", minLength: {value: 8, message: "A jelszónak legalább 8 karakternek kell lenni"}})}/>
                                    <p className="col-12 error-message-secondary">{errors.password && errors.password.message}</p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 secondary-darker-color flex-center">
                                <button className="login-button custom-button flex-center">
                                    Belépés <i className="pi pi-chevron-circle-right"/>
                                </button>
                            </div>

                            <div className="col-12 col-lg-3 secondary-darker-color">
                                <Link className="block-link" to={"/register"}>Regisztráció</Link>
                                <Link className="block-link" to={"/forgot-password"}>Elfelejtett jelszó</Link>
                            </div>

                            <div className="col-12 secondary-darker-color">
                                { responseStore.isFetching === true ? <i className="pi pi-spin pi-spinner" style={{fontSize: "2.5em"}}/> : null }
                            </div>
                            <div className="col-12 space-top secondary-darker-color">
                                <p className="error-message-secondary">{message}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
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

const mapStateToProps = (state) => ({
    responseStore: state[RESPONSE_MESSAGE],
    userStore: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);