import React, {useEffect} from 'react';
import {RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {RESET} from "../redux/constants/action-types";
import {sendToBackend} from "../redux/actions/request";

function ActivateUser({code, reset, activate, responseStore}) {

    useEffect(() => {
        reset();
    }, [reset]);

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
    activate: (code) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/user/activate/${code}`, undefined)),
    reset: () => dispatch({
        type: `${RESPONSE_MESSAGE}/${RESET}`
    })
});
const mapStateToProps = state => ({
    responseStore: state[RESPONSE_MESSAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser);