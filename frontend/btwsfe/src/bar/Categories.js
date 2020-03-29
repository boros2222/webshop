import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import './Categories.css';
import {CATEGORY} from "../redux/constants/namespaces";
import {fetchToStore} from "../redux/actions/request";

function Categories({loadCategories, categoriesStore, closeDropDown}) {

    useEffect(() => loadCategories(), [loadCategories]);

    if (categoriesStore.error !== undefined) {
        return <p>{categoriesStore.data.message}</p>
    } else if (categoriesStore.isFetching === true || categoriesStore.data === undefined) {
        return <i className="pi pi-spin pi-spinner" style={{'fontSize': '2.5em'}}/>
    }

    return (
        <div className="container">
            <div className="row">
                {
                    categoriesStore.data.map(category => {
                        return (
                            <div key={category.id} className="col-12 col-lg-4 category-element secondary-darker-color">
                                <Link onClick={() => closeDropDown()} to={`/category/${category.id}`}>{category.name}</Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    loadCategories: () => {
        dispatch(fetchToStore(CATEGORY, "/category/list", true))
    }
});
const mapStateToProps = (state) => ({
    categoriesStore: state[CATEGORY]
});
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
