import SSBLogo from './SSBLogo';
import Banner from './Banner';

import layoutStyles from '../layout.module.scss';
import styles from './header.module.scss';
import { ReactNode, ReactNodeArray } from 'react';
import { ArrowLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export type HeaderProps = {
    showAppBanner?: boolean;
    headerComp?: ReactNode | ReactNodeArray | null;
};

const Header = ({headerComp, showAppBanner = false}: HeaderProps) => {
    return (
        <div className={layoutStyles.headerZone}>
            {headerComp}
            {!headerComp &&
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
            }
        </div>
    );
};

export type ActionItem = {
    title: string;
    onClick: () => void;
}

export type OpHeaderProps = {
    title: string;
    showBack?: boolean;
    action: ActionItem;
};

export const OpHeader = ({showBack = true, title, action = null}: OpHeaderProps) => {
    const router = useRouter();
    const {t} = useTranslation('common');

    return (
        <div className={styles.header}>
            <div className={styles.back} onClick={() => { router.back(); }}>
                <ArrowLeft className={styles.backIcon}/>{t('links.back')}
                <div className={styles.pageTitle}>{title}</div>
            </div>
            {action && <span className={styles.actionLink} onClick={action.onClick}>{action.title}</span>}
        </div>
    );
};

export default Header;
