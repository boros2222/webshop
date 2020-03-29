import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './NavBar.css';
import LoginPanel from './LoginPanel';
import Categories from './Categories';
import {CURRENT_USER} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import Cart from "./Cart";

function NavBar({userStore}) {

    const [showDropDown, setShowDropDown] = useState(false);
    const [dropDownElement, setDropDownElement] = useState(<></>);

    const toggleDropDown = (element) => {
        if (dropDownElement.type === element.type) {
            closeDropDown();
        } else {
            openDropDown(element);
        }
    };

    const openDropDown = (element) => {
        setShowDropDown(true);
        setDropDownElement(element);
    };

    const closeDropDown = () => {
        setShowDropDown(false);
        setDropDownElement(<></>);
    };

    let loginLabel = "Bejelentkezés";
    if (userStore.isReady()) {
        loginLabel = "Profilom";
    }

    return (
        <>
            <div className="secondary-darker-color">
                <div className="container secondary-darker-color">
                    <div className="row navlinks secondary-darker-color">
                        <Link className="col-12 col-lg-2 navbar-button" style={{textAlign: "center"}}
                              onClick={closeDropDown} to={"/"}>Termékek</Link>
                        
                        <button className="col-12 col-lg-2 navbar-button"
                                onClick={() => toggleDropDown(<Categories closeDropDown = {closeDropDown} />)}>Kategóriák</button>
                        
                        <button className="col-12 col-lg-2 navbar-button"
                                onClick={() => toggleDropDown(<LoginPanel closeDropDown = {closeDropDown} />)}>{loginLabel}</button>
                        
                        <button className="col-12 col-lg-2 navbar-button"
                                onClick={() => toggleDropDown(<Cart closeDropDown = {closeDropDown} />)}>Kosár</button>
                    </div>
                </div>
            </div>
            {showDropDown &&
                <div className="shadows secondary-darker-color">
                    <div className="container secondary-darker-color">
                        <div className="dropdown-element secondary-darker-color">
                            {dropDownElement}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
    userStore: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);