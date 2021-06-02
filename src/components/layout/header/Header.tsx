import SSBLogo from './SSBLogo';
import Banner from './Banner';

import layoutStyles from '../layout.module.scss';
import styles from './header.module.scss';
import { ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import FbuIcon from '../../common/icons/FbuIcon';
import {Modal} from "@material-ui/core";
import Menu from "../../menu/Menu";

export type HeaderProps = {
    showAppBanner?: boolean;
    headerComp?: ReactNode | ReactNodeArray | null;
};

const Header = ({headerComp, showAppBanner = false}: HeaderProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <div className={layoutStyles.headerZone} id={'ssb-main-header'}>
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
                <button style={{backgroundColor: 'inherit', border: 'none', color: '#192326'}} onClick={() => setMenuOpen(true)}>
                    <div style={{display: 'flex', alignItems: 'center'}}><FbuIcon name={'Menu'} style={{color: '#1a9d49'}} /> <b>Meny</b></div>
                </button>

            </div>
            }

            <Modal open={menuOpen}  >
                <Menu onClose={() => setMenuOpen(false)}/>
            </Modal>
        </div>
    );
};

export type ActionItem = {
    title: string;
    onClick: () => void;
    disabled?: boolean;
}

export type OpHeaderProps = {
    title: string;
    showBack?: boolean;
    onBackClick?: (() => void) | null;
    action: ActionItem;
};

export const OpHeader = ({showBack = true, onBackClick = null, title, action = null}: OpHeaderProps) => {
    const router = useRouter();
    const {t} = useTranslation('common');
    const [actionComp, setActionComp] = useState<ReactNode>();

    useEffect(() => {
        if (action) {
            setActionComp(
                <span
                    className={`${styles.actionLink} ${action.disabled ? styles.disabled : ''}`}
                    onClick={!action.disabled ? action.onClick : () => {
                    }}
                >
                    {action.title}
                </span>
            );
        }
    }, [action]);

    return (
        <div className={styles.header}>
            <div className={styles.back} onClick={() => {
                if (typeof onBackClick === 'function') {
                    onBackClick();
                } else {
                    router.back();
                }
            }}>
                <FbuIcon name={'ArrowLeft'} size={20} className={styles.icon}/>{t('links.back')}
            </div>
            <div className={styles.pageTitle}>{title}</div>
            {actionComp}
        </div>
    );
};

export default Header;
