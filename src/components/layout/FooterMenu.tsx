import { useRouter } from 'next/router';
import FbuIcon, { IconName } from '../common/FbuIcon';

import footerStyles from './styles/footer.module.scss';

export type FooterMenuItem = {
    href: string;
    text: string;
    icon?: IconName;
};

export type FooterMenuProps = {
    footerMenuItems: FooterMenuItem[];
    showIcons?: boolean;
    iconSize?: number;
};

const isCurrent = (currentRoute: string, menuItem: FooterMenuItem) =>
    currentRoute.startsWith(menuItem.href);


const FooterMenu = ({footerMenuItems, showIcons = false, iconSize = 24}: FooterMenuProps) => {
    const router = useRouter();

    return (
        <div className={`${footerStyles.footerWrapper} ${footerStyles.appFooter}`}>
            {footerMenuItems.map(item => {
                console.log('item = current', router.pathname, item.href, isCurrent(router.pathname, item));
                return (
                    <div className={`${footerStyles.footerMenuItem} ${isCurrent(router.pathname, item) ? footerStyles.current : ''}`}>
                        <a aria-label={item.text} onClick={() => {
                            router.push(item.href);
                        }}>
                            {showIcons && item.icon && <FbuIcon name={item.icon} size={iconSize} />}
                            {showIcons && (!item.icon) && <FbuIcon name="HelpCircle" size={iconSize} />}
                            {item.text}
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default FooterMenu;
