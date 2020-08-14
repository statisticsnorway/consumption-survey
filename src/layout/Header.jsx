import React, { useState } from 'react';
import { Text } from '@statisticsnorway/ssb-component-library';
import { Bell } from 'react-feather';
import { Link } from 'react-router-dom';

const Header = ({siteTitle, version}) => {
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
                        <div className="diagonal-divider"/>
                        <div className="site-title">{siteTitle}</div>
                        &nbsp;
                        {version && <div className="desktop-version-number"><Text>v{version}</Text></div>}
                    </div>
                </div>
                <div className="right-section">
                    <div className="actionIcons">
                        <a className="actionIcon badge">
                            <Link to="/notifications"><Bell/></Link>
                            <div className="actionIconBadge">3</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
