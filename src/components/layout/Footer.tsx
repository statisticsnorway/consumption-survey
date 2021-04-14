import { useContext, useEffect } from 'react';
import FooterMenu, { FooterMenuItem } from './FooterMenu';

import footerStyles from './styles/footer.module.scss';
import { LayoutContext } from '../../uiContexts';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const FOOTER_INCLUDE_PAGES = [
    '/purchases/addPurchase',
    '/home',
    '/v2/purchases',
    '/support/settings'
];

const CUSTOM_FOOTER_PAGES = [];

const Footer = () => {
    const router = useRouter();
    const {showFooter, setShowFooter, footerContent} = useContext(LayoutContext);
    const {t} = useTranslation('footer');

    const FOOTER_MENU_ITEMS: FooterMenuItem[] = [{
        href: '/home',
        text: t('home.title'),
        icon: 'Home',
    }, {
        href: '/v2/purchases',
        text: t('purchases.title'),
        icon: 'ShoppingCart',
    }, {
        href: '/support/settings',
        text: t('settings.title'),
        icon: 'Settings',
    }];

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
                <FooterMenu footerMenuItems={FOOTER_MENU_ITEMS}/>
            ))
            }
        </>
    );
};

export default Footer;
