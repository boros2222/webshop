import React from 'react';
import '../App.css';

import SearchBar from './SearchBar';
import NavBar from './NavBar';

class Header extends React.Component {

    render() {
        return (
            <React.Fragment>

            <SearchBar key = {this.props.searchTerm} searchTerm = {this.props.searchTerm} />
            <NavBar />

            </React.Fragment>
        )
    }
}

export default Header;