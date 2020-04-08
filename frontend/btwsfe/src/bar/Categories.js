import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {CATEGORY} from "../redux/constants/namespaces";
import {fetchToStore} from "../redux/actions/request";

function Categories({loadCategories, categoriesStore, closeDropDown}) {

    useEffect(() => loadCategories(), [loadCategories]);

    if (!categoriesStore.isReady()) {
        return categoriesStore.getMessage();
    }

    return (
        <div className="container row">
            {categoriesStore.data.map(category => (
                <div key={category.id} className="col-12 col-lg-4 mb-2 font-size-normal secondary-darker-color">
                    <Link onClick={() => closeDropDown()} to={`/category/${category.id}`}>{category.name}</Link>
                </div>
            ))}
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
