import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import './SearchBar.css';
import "primeicons/primeicons.css";

function SearchBar(props) {

    const [searchTerm, setSearchTerm] = useState("");
    const [doSearch, setDoSearch] = useState(false);

    useEffect(() => {
        if (props.searchTerm) {
            setSearchTerm(props.searchTerm);
            setDoSearch(false);
        }
    }, [props.searchTerm]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.length > 0) {
            setDoSearch(true);
        }
    };

    let redirect = null;
    if (doSearch === true) {
        const url = `/search/${searchTerm}`;
        redirect = <Redirect to = {url} />;
    }

    return (
        <>
            <div className="secondary-color">
                <form className="container-sm secondary-color search-bar" onSubmit={handleSubmit}>
                    <div className="row search secondary-color">
                        <input className="col-10 col-lg-11 search-input" type="text" name="search" placeholder="Keresés a termékek között..."
                               value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <button className="col-2 col-lg-1 search-button">
                            <i className="pi pi-search"/>
                        </button>
                    </div>
                </form>
            </div>

            {redirect}
        </>
    )
}

export default SearchBar;