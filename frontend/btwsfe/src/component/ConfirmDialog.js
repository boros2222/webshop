import React, {useState} from 'react';
import {Dialog} from "primereact/dialog";

function ConfirmDialog({headerText, text, onConfirm, children}) {

    const [visible, setVisible] = useState(false);

    const hideDialog = () => {
        setVisible(false);
    };

    const showDialog = () => {
        setVisible(true);
    };

    const doConfirm = () => {
        onConfirm();
        hideDialog();
    };

    const header = (
        <p className="font-weight-bold font-size-medium">{headerText}</p>
    );

    const footer = (
        <div className="w-100 elements-apart">
            <button className="custom-button font-weight-bold" onClick={hideDialog}>Nem</button>
            <button className="custom-button-inverse font-weight-bold" onClick={doConfirm}>Igen</button>
        </div>
    );

    return (
        <>
            {React.cloneElement(children, { onClick: showDialog })}
            <Dialog header={header} footer={footer} visible={visible} className="container" onHide={hideDialog} modal={true} closable={false}>
                <p className="font-size-normal">{text}</p>
            </Dialog>
        </>
    )
}

export default ConfirmDialog;