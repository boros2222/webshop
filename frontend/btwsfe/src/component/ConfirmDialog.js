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
        <p className="bold" style={{fontSize: "1.5em"}}>{headerText}</p>
    );

    const footer = (
        <div className="max-width elements-apart">
            <button className="custom-button bold" onClick={hideDialog}>Nem</button>
            <button className="custom-button-inverse bold" onClick={doConfirm}>Igen</button>
        </div>
    );

    return (
        <>
            {React.cloneElement(children, { onClick: showDialog })}
            <Dialog header={header} footer={footer} visible={visible} className="container" onHide={hideDialog} modal={true} closable={false}>
                <p style={{fontSize: "1.2em"}}>{text}</p>
            </Dialog>
        </>
    )
}

export default ConfirmDialog;