import React, {useState, useEffect} from 'react';
import {CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {RESET} from "../redux/constants/action-types";
import {sendToBackend} from "../redux/actions/request";
import UserForm from "../component/UserForm";

function Register({reset, register, userStore, responseStore}) {

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit = (user) => {
        register(user, () => setSuccess(true));
    };

    if (userStore.isReady()) {
        return <p>Bejelentkezve nem lehet regisztrálni!</p>
    }

    let message = responseStore.getMessage();

    if (success) {
        return <p className="font-weight-bold">{message}</p>;
    }

    return (
        <div className="container-fluid pb-5">
            <p className="font-weight-bold font-size-medium">Regisztráció</p>
            <UserForm onSubmit={onSubmit} buttonLabel="Regisztráció"/>
            <div className="mt-2 primary-color">
                <p className="font-weight-bold">{message}</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    register: (user, callback) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/user/register", user, callback)),
    reset: () => dispatch({
        type: `${RESPONSE_MESSAGE}/${RESET}`
    })
});
const mapStateToProps = state => ({
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);