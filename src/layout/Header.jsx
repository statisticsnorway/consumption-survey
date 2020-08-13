import React, { useState } from 'react';
import { Text } from '@statisticsnorway/ssb-component-library';

const Header = ({ siteTitle, version }) => {
    const [menuIsOpen, toggleMenu] = useState(false);

    return (
        <div className="header-component-wrapper">
            <div className="content-holder d-flex justify-content-between flex-wrap">
                <div className="left-section">
                    <div className="logo-and-title">
                        <div className="home-nav">
                            <div className="logo-full">
                            </div>
                        </div>
                        <div className="diagonal-divider" />
                        <div className="site-title">{siteTitle}</div>
                        &nbsp;
                        <div className="desktop-version-number"><Text>v{version}</Text></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
