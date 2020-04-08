import React, {useState} from 'react';
import {THEME_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {getFromStorage, removeFromStorage, saveToStorage} from "../redux/actions/storage";
import constants from "../Constants";
import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";
import "./ThemeChooser.css";

function ThemeChooser({themeStore, setThemeStore, deleteThemeStore}) {

    const [overlayPanel, setOverlayPanel] = useState(undefined);

    const changeTheme = (theme) => {
        if (theme === "default") {
            deleteThemeStore();
        } else {
            setThemeStore(theme);
        }
        overlayPanel.hide();
    };

    const isChoosen = (theme) => {
        if (theme === "default") {
            return themeStore.data === null ? "color-button-selected" : "";
        } else {
            return themeStore.data === theme ? "color-button-selected" : "";
        }
    };

    return (
        <div className="d-flex justify-content-end">
            <Button className="theme-button mt-2 font-weight-bold font-size-normal" type="button" label="Téma" onClick={(event) => overlayPanel.toggle(event)} />

            <OverlayPanel ref={(el) => setOverlayPanel(el)} dismissable={true}>
                <div className={`color-button rounded-lg mb-2 ${isChoosen("default")}`}
                     style={{backgroundColor: "var(--blue-color)"}}
                     onClick={() => changeTheme("default")}/>

                <div className={`color-button rounded-lg mb-2 ${isChoosen("red-theme")}`}
                     style={{backgroundColor: "var(--red-color)"}}
                     onClick={() => changeTheme("red-theme")}/>

                <div className={`color-button rounded-lg mb-2 ${isChoosen("green-theme")}`}
                     style={{backgroundColor: "var(--green-color)"}}
                     onClick={() => changeTheme("green-theme")}/>

                <div className={`color-button rounded-lg mb-2 ${isChoosen("yellow-theme")}`}
                     style={{backgroundColor: "var(--yellow-color)"}}
                     onClick={() => changeTheme("yellow-theme")}/>
            </OverlayPanel>
        </div>
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