import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Grid, HelpCircle, Settings, User } from 'react-feather';

import footerStyles from './styles/footer.module.scss';
import { LayoutContext } from '../../uiContexts';
import { useRouter } from 'next/router';

const FOOTER_INCLUDE_PAGES = [
    '/purchases/addPurchase',
];

const Footer = () => {
    const router = useRouter();
    const [showFooter, setShowFooter] = useState(false);
    const {footerContent} = useContext(LayoutContext);

    useEffect(() => {
        setShowFooter(FOOTER_INCLUDE_PAGES.includes(router.pathname));
    }, [router.pathname]);

    console.log('footer', showFooter, router.pathname,
        FOOTER_INCLUDE_PAGES.includes(router.pathname));

    if (!showFooter) {
        return <></>;
    }

    return (
        <>
            {showFooter &&
            (footerContent ? footerContent : (
                <div className={`${footerStyles.footerWrapper} ${footerStyles.appFooter}`}>
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
            ))
            }
        </>
    );
};

export default Footer;
