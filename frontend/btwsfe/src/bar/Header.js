import React from 'react';
import '../App.css';

import SearchBar from './SearchBar';
import NavBar from './NavBar';
import ThemeChooser from "./ThemeChooser";

function Header({searchTerm}) {
    return (
        <>
            <div className="secondary-color">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="secondary-color">
                        <p className="font-size-normal font-weight-bold text-uppercase text-white pl-2" style={{letterSpacing: "0.1em"}}>Borostack</p>
                        <p className="font-size-normal font-weight-bold text-uppercase text-white pl-2" style={{letterSpacing: "0.1em"}}>Webshop</p>
                    </div>
                    <ThemeChooser/>
                </div>

                <SearchBar key = {searchTerm} searchTerm = {searchTerm}/>
            </div>
            <div className="secondary-darker-color">
                <NavBar/>
            </div>
        </>
    )
}

export default Header;