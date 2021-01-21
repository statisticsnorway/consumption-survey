import { PurchaseType } from '../../../firebase/model/Purchase';
import { useEffect, useState } from 'react';
import Modal from '../../common/dialog/Modal';
import { useTranslation } from 'react-i18next';

import styles from '../styles/addPurchase.module.scss';

export type DeletePurchaseDialogProps = {
    purchase: PurchaseType;
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const DeletePurchaseDialog = ({purchase, show, onConfirm, onCancel}: DeletePurchaseDialogProps) => {
    const [showPopup, setShowPopup] = useState<boolean>();
    const {t} = useTranslation('purchases');


    useEffect(() => {
        setShowPopup(show);
    }, [show]);

    return (
        <Modal show={showPopup}
               title={`${t('deletePurchase.title')} ?`}
               onClose={onConfirm}
               closeText={t('deletePurchase.confirmText')}
               onCancel={onCancel} cancelText={t('deletePurchase.cancelText')}
        >
            <div className={styles.deletePurchase}>
                <div className={styles.deletePurchaseText}>
                    <span className={styles.textPrefix}>{t('deletePurchase.text')}</span>
                    <span className={styles.textInfo}>{purchase.where}</span> ?
                </div>
                <span className={styles.deleteWarning}>
                    {t('deletePurchase.textWarning')}
                </span>
            </div>
        </Modal>
    );
};

export default DeletePurchaseDialog;
