import React from 'react';
import './MainLayout.css';

import Header from '../bar/Header';
import Footer from '../bar/Footer';

function MainLayout({content, match}) {

    return (
        <>
            <div className="max-width">
                <Header searchTerm = {match.params.searchTerm}/>
            </div>

            <div className="content-container container spacing-top-bottom primary-color">
                <div className="max-width primary-color">
                    {content}
                </div>
            </div>

            <div className="max-width secondary-darker-color">
                <Footer />
            </div>
        </>
    )
}

export default MainLayout;