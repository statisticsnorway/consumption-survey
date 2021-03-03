import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'react-feather';

import styles from './styles/editPurchase.module.scss';

export type AddItemLeaderProps = {
    onAddItemClick: () => void;
};

const AddItemLeader = ({onAddItemClick}: AddItemLeaderProps) => {
    const {t} = useTranslation('purchases');
    return (
        <div className={styles.emptyItemsTable}>
            <p>{t('addPurchase.addNewItem.leaderText')}</p>
            <button
                className={`ssb-btn secondary-btn ${styles.addNewItemButton}`}
                onClick={(e) => {
                    e.preventDefault();
                    onAddItemClick();
                }}
            >
                {t('addPurchase.addNewItem.label')}
                <PlusCircle className={styles.icon}/>
            </button>
        </div>
    );
};

export default AddItemLeader;
