import Link from 'next/link';
import { Grid, HelpCircle, Settings, User } from 'react-feather';

import footerStyles from './styles/footer.module.scss';

const Footer = () => {
    return (
        <div className={footerStyles.footerWrapper}>
            <div className={footerStyles.footerContent}>
                <Link href="/dashboard/Dashboard">
                    <a aria-label="dashboard"><Grid/></a>
                </Link>
                <Link href="/support/help">
                    <a aria-label="help"><HelpCircle/></a>
                </Link>
                <Link href="/support/settings">
                    <a aria-label="settings"><Settings/></a>
                </Link>
                <Link href="/support/profile">
                    <a aria-label="profile"><User/></a>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
