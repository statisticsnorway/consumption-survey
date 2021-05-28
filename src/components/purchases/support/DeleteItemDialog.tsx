import { ItemType } from '../../../firebase/model/Purchase';
import { useEffect, useState } from 'react';
import Modal from '../../common/dialog/Modal';
import { useTranslation } from 'react-i18next';

import styles from '../styles/addPurchase.module.scss';

export type DeleteItemDialogProps = {
    item: ItemType;
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const DeleteItemDialog = ({item, show, onConfirm, onCancel}: DeleteItemDialogProps) => {
    const [showPopup, setShowPopup] = useState<boolean>();
    const {t} = useTranslation('purchases');

    useEffect(() => {
        setShowPopup(show);
    }, [show]);

    return (
        <Modal show={showPopup}
               title={t('deleteItem.title')}
               onClose={onConfirm}
               closeText={t('deleteItem.confirmText')}
               onCancel={onCancel} cancelText={t('deleteItem.cancelText')}
        >
            <div className={styles.deleteItemDialog}>
                <>
                    <span className={styles.deleteItemTextPrefix}>{t('deleteItem.text')}</span>
                    <span className={styles.deleteItemInfo}>{item.name} ({item.qty} stk)</span>
                </>
                <span className={styles.deleteItemTextSuffix}>{t('deleteItem.textSuffix')}</span>
            </div>
        </Modal>
    );
};

export default DeleteItemDialog;
