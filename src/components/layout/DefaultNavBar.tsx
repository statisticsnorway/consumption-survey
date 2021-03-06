import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import { PATHS } from '../../uiConfig';

const DEFAULT_NAV_ITEMS = [
    {
        id: 'home',
        path: PATHS.HOME,
    }, {
        id: 'consumption',
        path: PATHS.CONSUMPTION,
    }, {
        id: 'progress',
        path: PATHS.PROGRESS,
    },
];

const DefaultNavBar = () => {
    const router = useRouter();
    const {t} = useTranslation('navbar');

    const makeDefaultNavItems = () => DEFAULT_NAV_ITEMS.map(item => ({
        id: item.id,
        title: t(item.id),
        onClick: () => { router.push(item.path); }
    }));

    return <Navbar navbarItems={makeDefaultNavItems()} />;
};

export default DefaultNavBar;
