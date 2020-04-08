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
    const [dropDownOrder, setDropDownOrder] = useState("");

    const toggleDropDown = (element, order) => {
        if (dropDownElement.type === element.type) {
            closeDropDown();
        } else {
            openDropDown(element, order);
        }
    };

    const openDropDown = (element, order) => {
        setShowDropDown(true);
        setDropDownElement(element);
        setDropDownOrder(order);
    };

    const closeDropDown = () => {
        setShowDropDown(false);
        setDropDownElement(<></>);
        setDropDownOrder("");
    };

    let loginLabel = "Bejelentkezés";
    if (userStore.isReady()) {
        loginLabel = "Profilom";
    }

    let dropDownContainer = undefined;
    if (showDropDown === true) {
        dropDownContainer = (
            <div className="container secondary-darker-color">
                <div className="py-3 secondary-darker-color">
                    {dropDownElement}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="secondary-darker-color">
                <div className="container-lg secondary-darker-color">
                    <div className="row nav-container pt-1 secondary-darker-color">
                        <Link className="order-0 col-12 col-lg-2 text-center nav-button"
                              onClick={closeDropDown} to={"/"}>Termékek</Link>
                        
                        <button className="order-2 col-12 col-lg-2 nav-button"
                                onClick={() => toggleDropDown(<Categories closeDropDown = {closeDropDown} />, "order-3")}>Kategóriák</button>
                        
                        <button className="order-4 col-12 col-lg-2 nav-button"
                                onClick={() => toggleDropDown(<LoginPanel closeDropDown = {closeDropDown} />, "order-5")}>{loginLabel}</button>
                        
                        <button className="order-6 col-12 col-lg-2 nav-button"
                                onClick={() => toggleDropDown(<Cart closeDropDown = {closeDropDown} />, "order-last")}>Kosár</button>

                        {showDropDown &&
                            <div className={`${dropDownOrder} d-block d-lg-none nav-shadows w-100 secondary-darker-color`}>
                                {dropDownContainer}
                            </div>
                        }
                    </div>
                </div>
            </div>
            {showDropDown &&
                <div className="d-none d-lg-block order-last nav-shadows w-100 secondary-darker-color">
                    {dropDownContainer}
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