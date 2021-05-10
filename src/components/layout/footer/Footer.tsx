import Navbar, { NavbarItem } from '../Navbar';

import layoutStyles from '../layout.module.scss';
import styles from './footer.module.scss';
import { ReactElement, ReactNode, ReactNodeArray } from 'react';

export type FooterProps = {
    footerComp?: ReactNode | ReactNodeArray | ReactElement;
    sticky?: boolean;
};

const Footer = ({ footerComp, sticky = true }: FooterProps) => {
    return (
        <div className={`${styles.footer} ${sticky && styles.sticky}`}>
            {footerComp || null}
        </div>
    );
};

export default Footer;

