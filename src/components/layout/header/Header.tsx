import layoutStyles from '../layout.module.scss';
import styles from './header.module.scss';
import Logo from './Logo';
import Banner from './Banner';

export type HeaderProps = {};

const Header = ({}: HeaderProps) => {
    return (
        <div className={styles.header}>
            <div className={styles.identity}>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <div className={styles.banner}>
                    <Banner siteTitle="Forbruk 2021" version="1.0"/>
                </div>
            </div>
        </div>
    );
};

export default Header;
