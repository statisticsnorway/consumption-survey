import { PurchaseType } from '../../../firebase/model/Purchase';
import { useEffect, useState } from 'react';
import Modal from '../../common/dialog/Modal';
import { useTranslation } from 'react-i18next';

import styles from '../styles/addPurchase.module.scss';
import DeleteConfirmDialog from '../../common/dialog/DeleteConfirmDialog';

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
        <DeleteConfirmDialog
            show={showPopup}
            onConfirm={onConfirm}
            confirmText={t('deletePurchase.confirmText')}
            onCancel={onCancel} cancelText={t('deletePurchase.cancelText')}
            leadingText={t('deletePurchase.text')}
            warningText={t('deletePurchase.textWarning')}
            info={purchase.where}
        />
    );
};

export default DeletePurchaseDialog;
