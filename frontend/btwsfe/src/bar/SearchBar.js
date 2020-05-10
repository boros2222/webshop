import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";

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

    return (
        <>
            <div className="secondary-color">
                <form className="container secondary-color pt-2 pt-lg-1 pl-4 pr-4 pb-4" onSubmit={handleSubmit}>
                    <div className="row rounded-lg px-3 py-2 secondary-color" style={{backgroundColor: "var(--lightest-color)"}}>
                        <input className="col-11 pl-1 p-0 font-size-normal" type="text" name="search" placeholder="Keresés a termékek között..."
                               value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <div className="col-1 p-0 primary-color d-flex justify-content-end">
                            <button className="p-0">
                                <i className="pi pi-search font-size-medium"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {doSearch === true &&
                <Redirect to = {`/search/${searchTerm}`}/>
            }
        </>
    )
}

export default SearchBar;