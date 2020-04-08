import React from 'react';
import Header from '../bar/Header';
import Footer from '../bar/Footer';
import {THEME_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";

function MainLayout({themeStore, content, match}) {

    return (
        <div id="main-layout" className={themeStore.data}>
            <div className="w-100">
                <Header searchTerm = {match.params.searchTerm}/>
            </div>

            <div className="container rounded-lg my-5 p-4 shadow primary-color">
                <div className="w-100 primary-color">
                    {content}
                </div>
            </div>

            <div className="w-100 secondary-darker-color">
                <Footer />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
});
const mapStateToProps = (state) => ({
    themeStore: state[THEME_STORAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);