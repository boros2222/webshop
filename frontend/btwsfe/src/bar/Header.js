import React from 'react';
import '../App.css';

import SearchBar from './SearchBar';
import NavBar from './NavBar';
import ThemeChooser from "./ThemeChooser";

function Header({searchTerm}) {
    return (
        <>
            <div className="secondary-color">
                <ThemeChooser/>
                <SearchBar key = {searchTerm} searchTerm = {searchTerm}/>
            </div>
            <div className="secondary-darker-color">
                <NavBar/>
            </div>
        </>
    )
}

export default Header;