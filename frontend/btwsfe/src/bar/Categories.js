import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import './Categories.css';
import {fetchToStore} from "../redux/actions/generic";
import {CATEGORY} from "../redux/constants/namespaces";

class Categories extends React.Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories } = this.props;
        if (categories.error !== undefined) {
            return (
                <p>{categories.data.message}</p>
            )
        } else if (categories.isFetching === true) {
            return (
                <p>Betöltés alatt...</p>
            )
        } else if (categories.fetchedAlready === true) {
            return (
                <div className="flex-break">
                    {
                        categories.data.map(category => {
                            return (
                                <div className="category-element secondary-darker-color">
                                    <Link to={`/category/${category.id}`} key={category.id}>{category.name}</Link>
                                </div>
                            );
                        })
                    }
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => {
            dispatch(fetchToStore(CATEGORY, "/category/list", true))
        }
    };
};
const mapStateToProps = state => {
    return {
        categories: state[CATEGORY]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
