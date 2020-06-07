import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import constants from "../Constants";
import {RESET} from "../redux/constants/action-types";
import {fetchToStore, sendToBackend} from "../redux/actions/request";
import {removeCookie} from "../redux/actions/cookie";
import {useForm} from "react-hook-form";

function LoginPanel({closeDropDown, userStore, responseStore, login, logout, reset}) {

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
                            <Link className="custom-button text-center d-inline-block" onClick={() => closeDropDown()} to={"/orders"}>
                                {userStore.isAdmin() ? "Rendelések" : "Rendeléseim"}
                            </Link>
                        </div>
                        {!userStore.isAdmin() &&
                            <div className="secondary-darker-color mb-2">
                                <Link className="custom-button text-center d-inline-block" onClick={() => closeDropDown()} to={"/settings"}>Adataim módosítása</Link>
                            </div>
                        }
                        {userStore.isAdmin() &&
                            <div className="secondary-darker-color mb-2">
                                <Link className="custom-button text-center d-inline-block" onClick={() => closeDropDown()} to={"/new-product"}>Új termék hozzáadása</Link>
                            </div>
                        }
                        {userStore.hasRole("SUPERADMIN") &&
                        <div className="secondary-darker-color mb-2">
                            <Link className="custom-button text-center d-inline-block" onClick={() => closeDropDown()} to={"/users"}>Felhasználók</Link>
                        </div>
                        }
                        <div className="secondary-darker-color mb-2">
                            <button className="custom-button" onClick={() => logout()}>Kijelentkezés</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 order-0 order-lg-1 secondary-darker-color">
                        <div className="col-12 col-lg-auto float-right mb-2 p-0 secondary-darker-color">
                            <p className="font-size-normal">Üdv, <span className="font-weight-bold">{user.name}</span>!</p>
                            <p>{user.role.label}</p>
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
                                <div className="row secondary-darker-color mb-2">
                                    <p className="col-12 col-lg-4">Email cím:</p>
                                    <input className="col-12 col-lg-8" type="text" name="email"
                                           ref={register({required: true, pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/})}/>
                                    {errors.email && errors.email.type === 'required' && <p className="col-12 pl-5 secondary-error-message">Email cím megadása kötelező</p>}
                                    {errors.email && errors.email.type === 'pattern' && <p className="col-12 pl-5 secondary-error-message">Email cím formátuma nem megfelelő</p>}
                                </div>
                                <div className="row secondary-darker-color">
                                    <p className="col-12 col-lg-4">Jelszó:</p>
                                    <input className="col-12 col-lg-8" type="password" name="password"
                                           ref={register({required: "Jelszó megadása kötelező", minLength: {value: 8, message: "A jelszónak legalább 8 karakternek kell lenni"}})}/>
                                    <p className="col-12 pl-5 secondary-error-message">{errors.password && errors.password.message}</p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 secondary-darker-color d-flex align-items-center justify-content-center">
                                <button className="custom-button mb-2 d-flex align-items-center justify-content-center">
                                    Belépés <i className="pi pi-chevron-circle-right font-size-normal ml-1"/>
                                </button>
                            </div>

                            <div className="col-12 col-lg-3 d-flex flex-column justify-content-center secondary-darker-color">
                                <Link className="block-link" onClick={() => closeDropDown()} to={"/register"}>Regisztráció</Link>
                                <Link className="block-link" onClick={() => closeDropDown()} to={"/forgot-password"}>Elfelejtett jelszó</Link>
                            </div>

                            <div className="col-12 mt-2 secondary-darker-color">
                                {message}
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