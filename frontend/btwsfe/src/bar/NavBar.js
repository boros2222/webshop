import React from 'react';
import {Link} from "react-router-dom";
import './NavBar.css';

import LoginPanel from './LoginPanel';
import Categories from './Categories';

import {slideInDown} from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {CURRENT_USER} from "../redux/constants/namespaces";
import {connect} from "react-redux";

const styles = {
    slideInDown: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInDown, 'slideInDown')
  }
};
 
class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false,
            dropdownElement: <span/>
        };
    }

    toggleDropdown = (element) => {
        if(this.state.dropdownElement.type === element.type) {
            this.setState({
                showDropdown: false,
                dropdownElement: <span/>
            });
        } else {
            this.setState({
                showDropdown: true,
                dropdownElement: element
            });
        }
    };

    render() {
        let dropdown;
        if (this.state.showDropdown === true) {
            dropdown = (
                <StyleRoot>
                <div className="dropdown-element secondary-darker-color" /* style={styles.slideInDown} */>
                    { this.state.dropdownElement }
                </div>
                </StyleRoot>
            );
        }

        let loginLabel = "Bejelentkezés";
        if (this.props.user.error === undefined && this.props.user.data !== undefined) {
            loginLabel = "Profilom";
        }

        return (
            <React.Fragment>

            <div className={"navlinks container secondary-darker-color " + (this.state.showDropdown ? "": "shadows")}>
                <Link className="navbar-button" to={"/"}>Termékek</Link>
                <button className="navbar-button" onClick={() => this.toggleDropdown(<Categories />)}>Kategóriák</button>
                <button className="navbar-button" onClick={() => this.toggleDropdown(<LoginPanel />)}>{loginLabel}</button>
                <Link className="navbar-button" to={"/"}>Kosár</Link>
            </div>

            <div className={"dropdown container secondary-darker-color " + (this.state.showDropdown ? "shadows": "")}>
                { dropdown }
            </div>

            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
    user: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);