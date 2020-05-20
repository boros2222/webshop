import React, {useEffect} from 'react';
import {CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {RESET} from "../redux/constants/action-types";
import {fetchToStore, sendToBackend} from "../redux/actions/request";
import UserForm from "../component/UserForm";
import ConfirmDialog from "../component/ConfirmDialog";
import {removeCookie} from "../redux/actions/cookie";
import constants from "../Constants";

function UserSettings({reset, updateUser, deleteUser, userStore, responseStore}) {

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit = (user) => {
        user.id = userStore.data.id;
        updateUser(user);
    };

    const onConfirm = () => {
        deleteUser(userStore.data.id);
    };

    if (userStore.error !== undefined) {
        return <p>Előbb jelentkezz be!</p>
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
        <>
            <div className="container-fluid">
                <p className="font-weight-bold font-size-medium">Adataim módosítása</p>
                <UserForm user={userStore.data} onSubmit={onSubmit} buttonLabel="Módosítás" edit={true}/>
                <ConfirmDialog headerText="Fiók törlése" text="Biztosan törölni kívánja a fiókját?" onConfirm={onConfirm}>
                    <button className="custom-button red-button mt-3">Fiók törlése</button>
                </ConfirmDialog>
                <div className="col-12 mt-2 primary-color">
                    <p className="font-weight-bold">{message}</p>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    const logout = () => {
        removeCookie(constants.AUTH_COOKIE_NAME, {
            path: `${constants.API_PATH}/`,
            callback: () => {dispatch(fetchToStore(CURRENT_USER, "/user/current", false))}
        })
    };
    return {
        updateUser: (user) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/user/update/${user.id}`, user, () => {
            dispatch(fetchToStore(CURRENT_USER, "/user/current", false))
        })),
        deleteUser: (userId) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/user/delete/${userId}`, undefined, logout)),
        reset: () => dispatch({
            type: `${RESPONSE_MESSAGE}/${RESET}`
        })
    }
};
const mapStateToProps = state => ({
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);