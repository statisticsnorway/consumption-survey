import React, { useEffect, useState } from 'react';
import Header from './layout/Header';
import Home from './pages/home/Home';

import './App.css';
import './ssb.scss'

const App = () => {
    return (
        <div className="app">
            <header className="app-header">
                <Header siteTitle="Forbruksdata" version="0.0.1"/>
            </header>
            <div className="header-component-wrapper front-page">
                <div className="content-wrapper">
                    <Home />
                </div>
            </div>
            <div className="footer-wrapper">
                <div className="footer-content">
                    <span className="ssb-text-wrapper small-text negative copyright-mark">
                        &copy; Statistisk sentrabyrå 2020
                    </span>
                </div>
            </div>
        </div>
    );
};

export default App;
