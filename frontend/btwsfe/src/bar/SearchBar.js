import React from 'react';
import { Link } from "react-router-dom";
import './SearchBar.css';

import "primeicons/primeicons.css";

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <React.Fragment>
            <div className="flex-center secondary-color search-bar">

                <span className="search primary-color">
                    <input className="search-input" type="text" name="search" placeholder="Keresés a termékek között..." />
                    <button className="search-button">
                        <i className="pi pi-search"></i>
                    </button>
                </span>

            </div>
            </React.Fragment>
        )
    }
}

export default SearchBar;