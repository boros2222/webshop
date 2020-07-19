import React, {useEffect} from 'react';
import {RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {activateUser} from "../redux/functions/user-functions";

function ActivateUser({code, activate, responseStore}) {

    useEffect(() => {
        activate(code);
    }, [activate, code]);

    return (
        <div className="container-fluid pb-2">
            <p className="font-weight-bold font-size-medium">Felhasználó aktiválása</p>
            <div className="mt-2 primary-color">
                <p className="font-weight-bold">{responseStore.getMessage()}</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    activate: activateUser(dispatch),
});
const mapStateToProps = state => ({
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser);