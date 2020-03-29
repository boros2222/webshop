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
        message = <i className="pi pi-spin pi-spinner" style={{fontSize: "2.5em"}}/>;
    } else if (responseStore.fetchedAlready === true) {
        message = responseStore.data.message;
    }

    return (
        <div className="container-fluid">
            <p className="bold" style={{fontSize: "1.5em"}}>Regisztráció</p>
            <UserForm onSubmit={onSubmit} buttonLabel="Regisztráció"/>
            <div className="space-top primary-color">
                <p className="bold">{message}</p>
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