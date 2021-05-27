import { PurchaseStatus, PurchaseType } from '../../../firebase/model/Purchase';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, ArrowRight, FileText, Info, UserCheck } from 'react-feather';
import Loader from '../../common/Loader';

import styles from './ocrStatus.module.scss';
import FbuIcon, { IconName } from '../../common/icons/FbuIcon';

const getStyleForStatus = (status: PurchaseStatus) => {
    switch (status) {
        case PurchaseStatus.COMPLETE:
            return styles.ocrStatus_OCR_COMPLETE;
        case PurchaseStatus.OCR_WAITING_NETWORK:
            return styles.ocrStatus_OCR_WAITING_NETWORK;
        case PurchaseStatus.OCR_UPLOAD_FAILED:
            return styles.ocrStatus_OCR_UPLOAD_FAILED;
        case PurchaseStatus.OCR_ERROR:
            return styles.ocrStatus_OCR_ERROR;
        case PurchaseStatus.OCR_IN_PROGRESS:
            return styles.ocrStatus_OCR_IN_PROGRESS;
        case PurchaseStatus.OCR_PENDING_USER_APPROVAL:
            return styles.ocrStatus_OCR_PENDING_USER_APPROVAL;
        default:
            return status;
    }
    ;
};

export type OcrStatusProps = {
    purchase: PurchaseType;
};

export const getMessageIcon = (status: PurchaseStatus): IconName => {
    switch (status) {
        case PurchaseStatus.OCR_COMPLETE:
        case PurchaseStatus.OCR_ERROR:
        case PurchaseStatus.OCR_UPLOAD_FAILED:
        case PurchaseStatus.OCR_PENDING_USER_APPROVAL:
            return 'AlertTriangle';
        case PurchaseStatus.OCR_WAITING_NETWORK:
            return 'Info';
        default:
            return null;
    }
};

const OcrStatus = ({purchase}: OcrStatusProps) => {
    const {t} = useTranslation('purchases');

    console.log('preview for', purchase.receipts);

    return (
        <div className={`${styles.ocrStatus} `}>
            <div className={styles.receiptAndMessage}>
                {purchase.receipts && (purchase.receipts.length > 0) &&
                <img src={purchase.receipts[0].previewUrl} className={styles.receiptPreview}/>
                }
                <div className={styles.message}>
                    <FbuIcon
                        name={getMessageIcon(purchase.status)}
                        className={`${styles.messageIcon} ocrStatus_${purchase.status}`}/>
                    <span className={styles.messageText}>{t(`addPurchase.status.${purchase.status}`)}</span>
                </div>
            </div>
            {(purchase.status === PurchaseStatus.OCR_IN_PROGRESS) &&
            <Loader show={true} width="100px" styleClass={styles.infoIcon}/>
            }
            {(purchase.status === PurchaseStatus.OCR_PENDING_USER_APPROVAL) &&
            <div className={styles.infoIcon}>
                <FileText/>
                <ArrowRight/>
                <UserCheck/>
            </div>
            }
        </div>
    );
};

export default OcrStatus;
