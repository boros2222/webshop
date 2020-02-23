import React from 'react';
import './MainLayout.css';

import Header from '../bar/Header';
import Footer from '../bar/Footer';

class MainLayout extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div className="bar">
                    <Header searchTerm = {this.props.match.params.searchTerm}/>
                </div>

                <div className="content-container spacing-top-bottom primary-color">
                    <div className="bar primary-color flex-center">
                        {this.props.content}
                    </div>
                </div>

                <div className="bar secondary-darker-color">
                    <Footer />
                </div>
            </React.Fragment>
        )
    }
}

export default MainLayout;