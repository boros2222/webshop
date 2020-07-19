import React from 'react';
import {CURRENT_USER, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import UserForm from "../component/UserForm";
import ConfirmDialog from "../component/ConfirmDialog";
import {deleteUser, logout, updateUser} from "../redux/functions/user-functions";

function UserSettings({updateUser, deleteUser, userStore, responseStore, logout}) {

    const onSubmit = (user) => {
        user.id = userStore.data.id;
        updateUser(user);
    };

    const onConfirm = () => {
        deleteUser(userStore.data.id).then(logout);
    };

    if (userStore.error !== undefined) {
        return <p>Nincs jogosultság a megtekintéshez!</p>
    }

    let message = responseStore.getMessage();

    return (
        <>
            <div className="container-fluid">
                <p className="font-size-medium">Adataim módosítása</p>
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

const mapDispatchToProps = dispatch => ({
    updateUser: updateUser(dispatch),
    deleteUser: deleteUser(dispatch),
    logout: logout(dispatch)
});
const mapStateToProps = state => ({
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);