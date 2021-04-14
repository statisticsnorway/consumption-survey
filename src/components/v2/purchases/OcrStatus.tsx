import { PurchaseStatus, PurchaseType } from '../../../firebase/model/Purchase';
import { useTranslation } from 'react-i18next';
import { UserCheck } from 'react-feather';
import Loader from '../../common/Loader';

import styles from './ocrStatus.module.scss';

const getStyleForStatus = (status: PurchaseStatus) => {
    switch (status) {
        case PurchaseStatus.COMPLETE: return styles.ocrStatus_OCR_COMPLETE;
        case PurchaseStatus.OCR_WAITING_NETWORK: return styles.ocrStatus_OCR_WAITING_NETWORK;
        case PurchaseStatus.OCR_UPLOAD_FAILED: return styles.ocrStatus_OCR_UPLOAD_FAILED;
        case PurchaseStatus.OCR_ERROR: return styles.ocrStatus_OCR_ERROR;
        case PurchaseStatus.OCR_IN_PROGRESS: return styles.ocrStatus_OCR_IN_PROGRESS;
        default:
            return status;
    };
};

export type OcrStatusProps = {
    purchase: PurchaseType;
};

const OcrStatus = ({purchase}: OcrStatusProps) => {
    const {t} = useTranslation('purchases');

    console.log('preview for', purchase.receipts);

        return (
        <div className={`${styles.ocrStatus} ocrStatus_${purchase.status}`}>
            {purchase.receipts && (purchase.receipts.length > 1) &&
                <img src={purchase.receipts[0].previewUrl} width="100px" />
            }
            <span className={styles.text}>{t(`addPurchase.status.${purchase.status}`)}</span>
            {(purchase.status === PurchaseStatus.OCR_IN_PROGRESS) &&
            <Loader show={true} width="100px"/>
            }
            {(purchase.status === PurchaseStatus.OCR_COMPLETE) &&
            <UserCheck className={styles.icon}/>
            }
        </div>
    );
};

export default OcrStatus;
