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
        <div style={{position: 'relative'}} className={`${style.menu} ${style.fullScreen}`}>
            <MenuHeader onClose={onClose}/>
            <div className={style.menuItems}>
                <div onClick={() => {
                    router.push(PATHS.HOME)
                    onClose()
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
                    onClose()
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
                    onClose()
                }} className={style.menuItem}>
                    <div>
                        <h3 style={{color: 'white'}} className={'ssb-title'}>{t('contact.title')}</h3>
                        <span>{t('contact.excerpt')}</span>
                    </div>
                    <FbuIcon name={'ChevronRight'} />
                </div>

            </div>


            <div className={style.logoutSection}>
                <hr/>
                <div className={style.buttonContainer}>
                    <button className={style.logoutButton}>
                        Logg ut
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu