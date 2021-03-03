import { PurchaseStatus, PurchaseType } from '../../firebase/model/Purchase';
import { useTranslation } from 'react-i18next';
import { UserCheck } from 'react-feather';
import Loader from '../common/Loader';

import styles from './ocrStatus.module.scss';

export type OcrStatusProps = {
    status: PurchaseStatus;
};

const OcrStatus = ({status}: OcrStatusProps) => {
    const {t} = useTranslation('purchases');

    return (
        <div className={styles.ocrStatus}>
            <span className={styles.text}>{t(`addPurchase.status.${status}`)}</span>
            {(status === PurchaseStatus.OCR_IN_PROGRESS) &&
            <Loader show={true} width="100px"/>
            }
            {(status === PurchaseStatus.OCR_COMPLETE) &&
            <UserCheck className={styles.icon}/>
            }
        </div>
    );
};

export default OcrStatus;
