import React, {useState} from 'react';
import {RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {checkNewPasswordCode, forgotPassword, setNewPassword} from "../redux/functions/user-functions";

function ForgotPassword({newPasswordCode, responseStore, forgotPassword, checkNewPasswordCode, setNewPassword}) {

    const {register, handleSubmit, watch, errors} = useForm();
    const [checkSuccess, setCheckSuccess] = useState(false);
    const [triedCheck, setTriedCheck] = useState(false);
    const [newPasswordSuccess, setNewPasswordSuccess] = useState(false);

    if (newPasswordCode == null) {
        return (
            <div className="container-fluid pb-2">
                <p className="font-weight-bold font-size-medium">Elfelejtett jelszó</p>
                <p className="font-size-normal mt-3">Ha új jelszót szeretne igényelni, akkor adja meg a regisztrált
                    felhasználó email címét és üzenetben elküldjük a további teendőket.</p>
                <div className="mt-4 mb-2 primary-color">
                    <form onSubmit={handleSubmit(form => forgotPassword(form.email))}>
                        <div className="row primary-color">

                            <p className="col-12 col-lg-2 d-inline-block p-0 required">Email cím:</p>

                            <div className="col-12 col-lg-6 mt-3 mt-lg-0 p-0 primary-color">
                                <input className="col-12" type="text" name="email"
                                       disabled={responseStore.isLoading()}
                                       ref={register({
                                           required: true,
                                           pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                                       })}/>
                                {errors.email && errors.email.type === 'required' &&
                                <p className="col-12 mt-2 error-message">Email cím megadása kötelező</p>}
                                {errors.email && errors.email.type === 'pattern' &&
                                <p className="col-12 mt-2 error-message">Email cím formátuma nem megfelelő</p>}
                            </div>

                            <div className="col-12 col-lg-3 mt-4 mt-lg-0 p-0 pl-lg-4">
                                <button disabled={responseStore.isLoading()}
                                        className="custom-button-inverse flex-center font-weight-bold float-right float-lg-left">
                                    Új jelszó igénylése
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="font-weight-bold mt-3">{responseStore.getMessage()}</p>
                </div>
            </div>
        )
    } else {
        if (checkSuccess === false) {
            if (triedCheck === false) {
                checkNewPasswordCode(newPasswordCode).then(() => setCheckSuccess(true));
                setTriedCheck(true);
            }
            return (
                <div className="container-fluid pb-2">
                    <p className="font-weight-bold font-size-medium">Jelszó visszaállítása</p>
                    <p className="font-weight-bold mt-3">{responseStore.getMessage()}</p>
                </div>
            )
        } else {
            const onSubmit = (user) => {
                user.passwordAgain = undefined;
                setNewPassword(newPasswordCode, user).then(() => setNewPasswordSuccess(true));
            };

            return (
                <div className="container-fluid pb-2">
                    <p className="font-weight-bold font-size-medium">Új jelszó megadása</p>

                    <div className="mt-4 mb-2 primary-color">
                        {newPasswordSuccess === false &&
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row primary-color">
                                    <p className="col-12 col-lg-2 d-inline-block p-0 required">Új jelszó:</p>

                                    <div className="col-12 col-lg-5 p-0 primary-color">
                                        <input className="col-12" type="password" name="password"
                                               disabled={responseStore.isLoading()}
                                               ref={register({required: true, minLength: 8})}/>
                                        {errors.password && errors.password.type === 'required' &&
                                        <p className="col-12 mt-2 error-message">Jelszó megadása kötelező</p>}
                                        {errors.password && errors.password.type === 'minLength' &&
                                        <p className="col-12 mt-2 error-message">A jelszónak legalább 8 karakternek kell lenni</p> }
                                    </div>
                                </div>
                                <div className="row mt-3 primary-color">
                                    <p className="col-12 col-lg-2 d-inline-block p-0 required">Új jelszó újra:</p>

                                    <div className="col-12 col-lg-5 p-0 primary-color">
                                        <input className="col-12" type="password" name="passwordAgain"
                                               disabled={responseStore.isLoading()}
                                               ref={register({required: true, minLength: 8, validate: (value) => value === watch("password")})}/>
                                        {errors.passwordAgain && errors.passwordAgain.type === 'required' &&
                                        <p className="col-12 mt-2 error-message">Jelszó megadása kötelező</p>}
                                        {errors.passwordAgain && errors.passwordAgain.type === 'minLength' &&
                                        <p className="col-12 mt-2 error-message">A jelszónak legalább 8 karakternek kell lenni</p> }
                                        {errors.passwordAgain && errors.passwordAgain.type === 'validate' &&
                                        <p className="col-12 mt-2 error-message">A két jelszónak meg kell egyeznie</p> }
                                    </div>
                                </div>
                                <div className="row mt-4 primary-color">
                                    <div className="col-12 p-0">
                                        <button disabled={responseStore.isLoading()}
                                                className="custom-button-inverse flex-center font-weight-bold">
                                            Új jelszó beállítása
                                        </button>
                                    </div>
                                </div>
                            </form>
                        }
                        <p className="font-weight-bold mt-3">{responseStore.getMessage()}</p>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => ({
    forgotPassword: forgotPassword(dispatch),
    checkNewPasswordCode: checkNewPasswordCode(dispatch),
    setNewPassword: setNewPassword(dispatch)
});
const mapStateToProps = state => ({
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);