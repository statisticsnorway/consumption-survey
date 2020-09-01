import Link from 'next/link';
import { Grid, HelpCircle, Settings, User } from 'react-feather';

import footerStyles from './styles/footer.module.scss';

const Footer = () => {
    return (
        <div className={footerStyles.footerWrapper}>
            <div className={footerStyles.footerContent}>
                <Link href="/dashboard">
                    <a><Grid/></a>
                </Link>
                <Link href="/support/help">
                    <a><HelpCircle/></a>
                </Link>
                <Link href="/support/settings">
                    <a><Settings/></a>
                </Link>
                <Link href="/support/profile">
                    <a><User/></a>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
