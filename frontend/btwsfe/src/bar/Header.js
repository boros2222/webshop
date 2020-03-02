import React from 'react';
import '../App.css';

import SearchBar from './SearchBar';
import NavBar from './NavBar';

function Header(props) {
    return (
        <>
            <SearchBar key = {props.searchTerm} searchTerm = {props.searchTerm} />
            <NavBar />
        </>
    )
}

export default Header;