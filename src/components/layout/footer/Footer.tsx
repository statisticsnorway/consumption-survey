import Navbar, { NavbarItem } from '../Navbar';

import layoutStyles from '../layout.module.scss';
import styles from './footer.module.scss';

export type FooterProps = {
    navItems?: NavbarItem[];
};

const Footer = ({ navItems }: FooterProps) => {
    return (
        <div className={styles.footer}>
            {navItems && <Navbar navbarItems={navItems}/>}
        </div>
    );
};

export default Footer;

