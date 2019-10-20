import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import constants from '../Constants';

import './Categories.css';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        const cookies = new Cookies();
        cookies.set('asd', 'huhu', {
            secure: false,
            path: "/"
        });

        axios({
            method: 'GET',
            url: `${constants.backendUrl}/category/list`,
            withCredentials: true
        }).then(res => {
            this.setState({
                categories: res.data
            });
        });
    }

    render() {
        return (
            <div className="flex-break">
                { this.state.categories.map(category => {
                    return (
                        <div className="category-element secondary-darker-color">
                            <Link to={`/category/${category.id}`} key={category.id}>{category.name}</Link>
                        </div>
                    );
                }) }
            </div>
        )
    }

}

export default Categories;