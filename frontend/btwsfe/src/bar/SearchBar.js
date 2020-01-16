import React from 'react';
import {Redirect} from "react-router-dom";
import './SearchBar.css';
import "primeicons/primeicons.css";

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            toSearch: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.search.length > 0) {
            this.setState({
                toSearch: true
            });
        }
    };

    render() {
        if (this.state.toSearch === true) {
            const url = `/search/${this.state.search}`;
            return <Redirect to={url} />
        }

        return (
            <div className="flex-center secondary-color search-bar">
                <form className="search secondary-color" onSubmit={this.handleSubmit}>
                    <input className="search-input" type="text" name="search" placeholder="Keresés a termékek között..."
                           value={this.state.search} onChange={(e) => this.setState({search: e.target.value})}/>
                    <button className="search-button">
                        <i className="pi pi-search"/>
                    </button>
                </form>
            </div>
        )
    }
}

export default SearchBar;