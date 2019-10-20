import React from 'react';
import './MainLayout.css';

import LoginPanel from '../bar/LoginPanel';
import Header from '../bar/Header';
import Footer from '../bar/Footer';

class MainLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoginPopup: true
        };

        this.toggleLoginPopup = this.toggleLoginPopup.bind(this);
    }

    toggleLoginPopup() {
        this.setState({
            showLoginPopup: !this.state.showLoginPopup
        });
    }

    render() {
        const showLoginPopup = this.state.showLoginPopup;
        let LoginPopup;

        if (this.state.showLoginPopup == true) {
            LoginPopup = (
                <div className="popup">
                    <LoginPanel />
                </div>
            );
        }

        return (
            <React.Fragment>

                <div className="bar">
                    <Header />
                </div>

                <div className="bar container spacing-top-bottom primary-color">
                    {this.props.content}
                </div>

                <div className="bar secondary-darker-color">
                    <Footer />
                </div>

            </React.Fragment>
        )
    }
}

export default MainLayout;