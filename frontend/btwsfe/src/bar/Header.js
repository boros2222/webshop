import React from 'react';
import '../App.css';

import SearchBar from './SearchBar';
import NavBar from './NavBar';

function Header({searchTerm}) {
    return (
        <>
            <SearchBar key = {searchTerm} searchTerm = {searchTerm} />
            <NavBar />
        </>
    )
}

export default Header;