import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './NavBar.css';
import LoginPanel from './LoginPanel';
import Categories from './Categories';
import {CURRENT_USER} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import Cart from "./Cart";

function NavBar(props) {

    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownElement, setDropdownElement] = useState(<></>);

    const toggleDropdown = (element) => {
        if(dropdownElement.type === element.type) {
            closeDropdown();
        } else {
            openDropdown(element);
        }
    };

    const openDropdown = (element) => {
        setShowDropdown(true);
        setDropdownElement(element);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
        setDropdownElement(<></>);
    };

    let dropDown;
    if (showDropdown === true) {
        dropDown = (
            <div className="dropdown-element secondary-darker-color">
                { dropdownElement }
            </div>
        );
    }

    let loginLabel = "Bejelentkezés";
    if (props.userStore.error === undefined && props.userStore.data !== undefined) {
        loginLabel = "Profilom";
    }

    return (
        <>
            <div className="secondary-darker-color">
                <div className="container secondary-darker-color">
                    <div className="row navlinks secondary-darker-color">
                        <Link className="col-12 col-lg-2 navbar-button" style={{textAlign: "center"}} to={"/"}>Termékek</Link>
                        <button className="col-12 col-lg-2 navbar-button" onClick={() => toggleDropdown(<Categories closeDropdown = {closeDropdown} />)}>Kategóriák</button>
                        <button className="col-12 col-lg-2 navbar-button" onClick={() => toggleDropdown(<LoginPanel closeDropdown = {closeDropdown} />)}>{loginLabel}</button>
                        <button className="col-12 col-lg-2 navbar-button" onClick={() => toggleDropdown(<Cart closeDropdown = {closeDropdown} />)}>Kosár</button>
                    </div>
                </div>
            </div>
            {showDropdown &&
                <div className="secondary-darker-color shadows">
                    <div className="container secondary-darker-color">
                        { dropDown }
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