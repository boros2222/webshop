import React from 'react';
import axios from "axios";
import constants from "./Constants";

export class DataProvider {

    categories = undefined;

    async getCategories() {
        if (this.categories === undefined) {
            this.categories = await this.loadFromServer(`${constants.BACKEND_URL}/category/list`);
        }

        return this.categories;
    }

    loadFromServer(urlPath) {
        return axios({
            method: 'GET',
            url: urlPath,
            withCredentials: true
        }).then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
    }

}

const DataContext = React.createContext(DataProvider);

export default DataContext;
