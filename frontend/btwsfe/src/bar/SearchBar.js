import React, {Fragment} from 'react';
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

    componentDidMount() {
        if (this.props.searchTerm) {
            this.setState({
                search: this.props.searchTerm,
                toSearch: false
            });
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
        let redirect = null;
        if (this.state.toSearch === true) {
            const url = `/search/${this.state.search}`;
            redirect = <Redirect to={url} />;
        }

        return (
            <Fragment>
                <div className="flex-center secondary-color search-bar">
                    <form className="search secondary-color" onSubmit={this.handleSubmit}>
                        <input className="search-input" type="text" name="search" placeholder="Keresés a termékek között..."
                               value={this.state.search} onChange={(e) => this.setState({search: e.target.value})}/>
                        <button className="search-button">
                            <i className="pi pi-search"/>
                        </button>
                    </form>
                </div>

                {redirect}
            </Fragment>
        )
    }
}

export default SearchBar;