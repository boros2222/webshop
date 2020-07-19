import React, {useEffect, useState} from 'react';
import {THEME_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";
import "./ThemeChooser.css";
import {InputSwitch} from "primereact/inputswitch";
import {deleteTheme, setTheme} from "../redux/functions/theme-functions";

function ThemeChooser({themeStore, setTheme, deleteTheme}) {

    const [overlayPanel, setOverlayPanel] = useState(undefined);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(themeStore.data === "dark-theme")
    }, [themeStore]);

    const switchDarkMode = (turnedOn) => {
        if (turnedOn) {
            setTheme("dark-theme");
        } else {
            deleteTheme();
        }
        overlayPanel.hide();
    };

    return (
        <>
            <Button className="theme-button mt-2 font-weight-bold font-size-normal" type="button" label="Sötét mód" onClick={(event) => overlayPanel.toggle(event)} />
            <OverlayPanel ref={(el) => setOverlayPanel(el)} dismissable={true}>
                <InputSwitch checked={darkMode} onChange={event => switchDarkMode(event.value)} />
            </OverlayPanel>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    setTheme: setTheme(dispatch),
    deleteTheme: deleteTheme(dispatch)
});
const mapStateToProps = state => ({
    themeStore: state[THEME_STORAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(ThemeChooser);