import React, {useRef, useEffect} from 'react';
import Header from '../bar/Header';
import Footer from '../bar/Footer';
import {THEME_STORAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";

function MainLayout({themeStore, content, match}) {

    const headerRef = useRef(undefined);
    const contentRef = useRef(undefined);
    const footerRef = useRef(undefined);

    const setContentHeight = () => {
        if (headerRef.current != null && contentRef.current != null && footerRef.current != null) {
            const windowHeight = document.documentElement.clientHeight;
            const headerHeight = headerRef.current.offsetHeight;
            const footerHeight = footerRef.current.offsetHeight;
            contentRef.current.style.minHeight = `${windowHeight - headerHeight - footerHeight}px`;
        }
    };

    window.onload = setContentHeight;
    window.addEventListener("resize", setContentHeight);

    useEffect(() => {
        setContentHeight();
    });

    return (
        <div id="main-layout" className={themeStore.data}>
            <div className="w-100" ref={headerRef}>
                <Header searchTerm = {match.params.searchTerm}/>
            </div>

            <div className="container px-0 py-5" ref={contentRef}>
                <div className="w-100 rounded-lg p-4 shadow primary-color">
                    {content}
                </div>
            </div>

            <div className="w-100 secondary-darker-color" ref={footerRef}>
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