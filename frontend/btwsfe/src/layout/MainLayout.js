import React from 'react';
import './MainLayout.css';

import Header from '../bar/Header';
import Footer from '../bar/Footer';

class MainLayout extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div className="bar">
                    <Header />
                </div>

                <div className="container">
                    <div className="bar spacing-top-bottom primary-color">
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