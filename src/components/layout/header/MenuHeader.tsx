import styles from './header.module.scss';
import SSBLogo from "./SSBLogo";
import Banner from "./Banner";
import FbuIcon from "../../common/icons/FbuIcon";

export type MenuHeaderProps = {
    onClose?: () => void
};

const MenuHeader = ({onClose = () => console.log('Placeholder action')} : MenuHeaderProps) => {
    return (
        <div className={styles.header}>
            <div className={styles.identity}>
                <div className={styles.logo}>
                    <SSBLogo fill={'#274247'} linefill={'#fff'} />
                </div>
            </div>
            <div>
                <button
                    onClick={onClose}
                    style={{backgroundColor: 'inherit', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center'}}>
                    <FbuIcon name={'X'}/>
                    Lukk
                </button>

            </div>
        </div>
    )
}

export default MenuHeader