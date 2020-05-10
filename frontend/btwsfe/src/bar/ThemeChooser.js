import React, {useState, useEffect} from 'react';
import {THEME_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {getFromStorage, removeFromStorage, saveToStorage} from "../redux/actions/storage";
import constants from "../Constants";
import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";
import "./ThemeChooser.css";
import {InputSwitch} from "primereact/inputswitch";

function ThemeChooser({themeStore, setThemeStore, deleteThemeStore}) {

    const [overlayPanel, setOverlayPanel] = useState(undefined);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(themeStore.data === "dark-theme")
    }, [themeStore]);

    const switchDarkMode = (turnedOn) => {
        if (turnedOn) {
            setThemeStore("dark-theme");
        } else {
            deleteThemeStore();
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
    setThemeStore: (theme) => saveToStorage(constants.THEME_STORAGE_NAME, theme, {
        callback: () => dispatch(getFromStorage(THEME_STORAGE, constants.THEME_STORAGE_NAME))
    }),
    deleteThemeStore: () => removeFromStorage(constants.THEME_STORAGE_NAME, {
        callback: () => dispatch(getFromStorage(THEME_STORAGE, constants.THEME_STORAGE_NAME))
    })
});
const mapStateToProps = state => ({
    themeStore: state[THEME_STORAGE]
});
export default connect(mapStateToProps, mapDispatchToProps)(ThemeChooser);