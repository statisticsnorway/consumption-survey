import SSBLogo from './SSBLogo';
import Banner from './Banner';

import layoutStyles from '../layout.module.scss';
import styles from './header.module.scss';

export type HeaderProps = {
    showAppBanner?: boolean;
};

const Header = ({showAppBanner = false}: HeaderProps) => {
    return (
        <div className={layoutStyles.headerZone} id={"ssb-main-header"}>
            <div className={styles.header}>
                <div className={styles.identity}>
                    <div className={styles.logo}>
                        <SSBLogo/>
                    </div>
                    {showAppBanner &&
                    <div className={styles.banner}>
                        <Banner siteTitle="Forbruk 2021" version="1.0"/>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
