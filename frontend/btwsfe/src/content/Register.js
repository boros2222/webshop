import React, {useState} from 'react';
import {CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import UserForm from "../component/UserForm";
import {registerUser} from "../redux/functions/user-functions";

function Register({register, userStore, responseStore}) {

    const [success, setSuccess] = useState(false);

    const onSubmit = (user) => {
        register(user).then(() => setSuccess(true));
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
    register: registerUser(dispatch)
});
const mapStateToProps = state => ({
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);