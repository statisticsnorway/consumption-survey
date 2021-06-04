import MenuHeader from "../layout/header/MenuHeader";
import {useTranslation} from "react-i18next";
import FbuIcon from "../common/icons/FbuIcon";
import { useRouter } from 'next/router';
import {PATHS} from "../../uiConfig";
import style from './menu.module.scss'
import {useContext} from "react";
import {UserContext} from "../../contexts";

export type MenuProps = {
    onClose?: () => void
};

const Menu = ({onClose = () => console.log('placeholder')} : MenuProps) => {
    const router = useRouter()
    const {userInfo} = useContext(UserContext)
    const {t} = useTranslation('mainMenu')
    return (
        <div style={{position: 'relative'}} className={`${style.menu} ${style.fullScreen}`}>
            <MenuHeader onClose={onClose}/>
            <div className={style.menuItems}>
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
                <hr />
                <div onClick={() => { router.push(PATHS.INSTALL); onClose(); }} className={style.menuItem}>
                    <div>
                        <h3 style={{color: 'white'}} className={'ssb-title'}>{t('install.title')}</h3>
                        <span>{t('install.excerpt')}</span>
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
                <div className={style.whoamiContainer}>
                    Du er logget inn som
                    <h3>{userInfo.respondentDetails.name}</h3>
                </div>
                <div className={style.buttonContainer}>
                    <button
                        onClick={() => {
                            onClose()
                            router.push(PATHS.LOGOUT)
                        }}
                        className={style.logoutButton}>
                        Logg ut
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu
