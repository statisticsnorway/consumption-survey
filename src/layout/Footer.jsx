import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, HelpCircle, Settings, User } from 'react-feather';

import './footer.scss';

const Footer = () => {
    return (
        <>
            <Link to="/dashboard">
                <Grid />
            </Link>
            <Link to="/help">
                <HelpCircle />
            </Link>
            <Link to="/settings">
                <Settings />
            </Link>
            <Link to="/profile">
                <User />
            </Link>
        </>
    );
};

export default Footer;
