import MenuHeader from "../layout/header/MenuHeader";
import {useTranslation} from "react-i18next";
import FbuIcon from "../common/icons/FbuIcon";
import { useRouter } from 'next/router';
import {PATHS} from "../../uiConfig";
import style from './menu.module.scss'

export type MenuProps = {
    onClose?: () => void
};

const Menu = ({onClose = () => console.log('placeholder')} : MenuProps) => {
    const router = useRouter()
    const {t} = useTranslation('mainMenu')
    return (
        <div className={style.menu}>
            <MenuHeader onClose={onClose}/>
            <div className={style.menuItems}>
                <div onClick={() => {
                    router.push(PATHS.HOME)
                }} className={style.menuItem}>
                    <div>
                        <h3 style={{color: 'white'}} className={'ssb-title'}>{t('home.title')}</h3>
                        <span>{t('home.excerpt')}</span>
                    </div>
                    <FbuIcon name={'ChevronRight'} />
                </div>
                <hr/>
                <div onClick={() => {
                    router.push(PATHS.ABOUT)
                }} className={style.menuItem}>
                    <div>
                        <h3 style={{color: 'white'}} className={'ssb-title'}>{t('onFbu.title')}</h3>
                        <span>{t('onFbu.excerpt')}</span>
                    </div>
                    <FbuIcon name={'ChevronRight'} />
                </div>
                <hr/>
                <div onClick={() => {
                    router.push(PATHS.CONTACT)
                }} className={style.menuItem}>
                    <div>
                        <h3 style={{color: 'white'}} className={'ssb-title'}>{t('contact.title')}</h3>
                        <span>{t('contact.excerpt')}</span>
                    </div>
                    <FbuIcon name={'ChevronRight'} />
                </div>

            </div>
            <hr/>

            <div className={style.logoutSection}>
                <button className={style.logoutButton}>
                    Logg ut
                </button>
            </div>
        </div>
    )
}

export default Menu