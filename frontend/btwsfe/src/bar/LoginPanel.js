import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
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

    let message = responseStore.getMessage();

    if (userStore.isReady()) {
        const user = userStore.data;
        return (
            <div className="container-fluid secondary-darker-color">
                <div className="row">
                    <div className="col-12 col-lg-6 order-1 order-lg-0 secondary-darker-color">
                        <div className="secondary-darker-color mb-2">
                            <Link className="custom-button text-center d-inline-block" to={"/orders"}>Rendeléseim</Link>
                        </div>
                        <div className="secondary-darker-color mb-2">
                            <Link className="custom-button text-center d-inline-block" to={"/settings"}>Adataim módosítása</Link>
                        </div>
                        {userStore.isAdmin() &&
                            <div className="secondary-darker-color mb-2">
                                <Link className="custom-button text-center d-inline-block" to={"/new-product"}>Új termék</Link>
                            </div>
                        }
                        <div className="secondary-darker-color mb-2">
                            <button className="custom-button" onClick={() => logout()}>Kijelentkezés</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 order-0 order-lg-1 secondary-darker-color">
                        <div className="col-12 col-lg-auto float-right mb-2 p-0 secondary-darker-color">
                            <p className="font-size-normal">Üdv, <span className="font-weight-bold">{user.name}</span>!</p>
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
                                <div className="row secondary-darker-color mb-1">
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
                            <div className="col-12 col-lg-3 secondary-darker-color d-flex align-items-center justify-content-center">
                                <button className="custom-button mb-2 d-flex align-items-center justify-content-center">
                                    Belépés <i className="pi pi-chevron-circle-right font-size-normal ml-1"/>
                                </button>
                            </div>

                            <div className="col-12 col-lg-3 d-flex flex-column justify-content-center secondary-darker-color">
                                <Link className="block-link" to={"/register"}>Regisztráció</Link>
                                <Link className="block-link" to={"/forgot-password"}>Elfelejtett jelszó</Link>
                            </div>

                            <div className="col-12 mt-2 secondary-darker-color">
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