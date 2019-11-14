import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCategories} from "../redux/actions/categories";
import './Categories.css';

class Categories extends React.Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories } = this.props;
        if (categories.error !== undefined) {
            return (
                <p>Hiba történt</p>
            )
        } else if (categories.isFetching === true) {
            return (
                <p>Betöltés alatt</p>
            )
        } else {
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
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => {dispatch(fetchCategories())}
    };
};
const mapStateToProps = state => {
    return {
        categories: state.categories
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
