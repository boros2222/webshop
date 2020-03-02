import React from 'react';
import './MainLayout.css';

import Header from '../bar/Header';
import Footer from '../bar/Footer';

function MainLayout(props) {

    return (
        <>
            <div className="max-width">
                <Header searchTerm = {props.match.params.searchTerm}/>
            </div>

            <div className="content-container container spacing-top-bottom primary-color">
                <div className="max-width primary-color">
                    {props.content}
                </div>
            </div>

            <div className="max-width secondary-darker-color">
                <Footer />
            </div>
        </>
    )
}

export default MainLayout;