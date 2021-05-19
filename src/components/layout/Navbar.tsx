import styles from './navbar.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DEFAULT_NAV_ITEMS = [
    {
        id: 'home',
        path: '/home',
    }, {
        id: 'consumption',
        path: '/consumption',
    }, {
        id: 'tasks',
        path: '/tasks',
    },
];

export type NavbarItem = {
    id: string;
    title: string;
    onClick?: () => void;
}

export type NavbarProps = {
    navbarItems: NavbarItem[];
    selection?: string;
};

const Navbar = ({navbarItems, selection}: NavbarProps) => {
    const router = useRouter();
    const [currSelection, setCurrSelection] = useState<string>(null);

    useEffect(() => {
        if (selection) {
            const match = navbarItems.find(item => item.id === selection);
            if (match) {
                setCurrSelection(selection);
            }
        } else if (navbarItems && navbarItems.length > 0) {
            console.log('router.path', router.pathname);
            const match = navbarItems.find(item => router.pathname.startsWith(`/${item.id}`));
            console.log('match', match);

            if (match) {
                setCurrSelection(match.id);
            }
        }
    }, [selection, router.pathname]);

    const onNavItemClick = (navItem: NavbarItem) => {
        setCurrSelection(navItem.id);
        if (typeof navItem.onClick === 'function') {
            navItem.onClick();
        }
    };

    return (
        <div className={styles.navbar}>
            {navbarItems.map(navbarItem => (
                <div
                    className={`${styles.navbarItem} ${currSelection === navbarItem.id ? styles.current : ''}`}
                    onClick={() => {
                        onNavItemClick(navbarItem);
                    }}
                    key={navbarItem.id}
                >
                    {navbarItem.title}
                </div>
            ))}
        </div>
    );
};

export default Navbar;
