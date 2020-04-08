import React, {useEffect} from 'react';
import {CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {RESET} from "../redux/constants/action-types";
import {sendToBackend} from "../redux/actions/request";
import UserForm from "../component/UserForm";

function Register({reset, register, userStore, responseStore}) {

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit = (user) => {
        register(user);
    };

    if (userStore.isReady()) {
        return <p>Bejelentkezve nem lehet regisztrálni!</p>
    }

    let message = undefined;
    if (responseStore.error !== undefined) {
        message = responseStore.data.message;
    } else if (responseStore.isFetching === true) {
        message = <i className="pi pi-spin pi-spinner font-size-large"/>;
    } else if (responseStore.fetchedAlready === true) {
        message = responseStore.data.message;
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
    register: (user) => dispatch(sendToBackend(RESPONSE_MESSAGE, "/user/register", user)),
    reset: () => dispatch({
        type: `${RESPONSE_MESSAGE}/${RESET}`
    })
});
const mapStateToProps = state => ({
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);