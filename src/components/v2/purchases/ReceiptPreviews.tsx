import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'react-feather';
import Loader from '../../common/Loader';
import {
    OCR_ERROR_STATUSES,
    OCR_INCOMPLETE_STATUSES,
    ReceiptInfo,
    ReceiptStatus
} from '../../../firebase/model/Purchase';

import styles from './styles/receipts.module.scss';

export type ReceiptPreviewsProps = {
    receipts: ReceiptInfo[];
    showAddReceipt?: boolean;
};

const ReceiptPreviews = ({receipts, showAddReceipt = true}: ReceiptPreviewsProps) => {
    const {t} = useTranslation('receipts');

    return (
        <>
            <div className={styles.receiptPreviews}>
                {receipts.map(receipt => (
                    <div className={styles.receiptPreview}>
                        <div className={styles.text}>
                            {(receipt.status === ReceiptStatus.CREATED) &&
                            <>
                                <p className={styles.readyForScanning}>{t('previews.scanning.readyForScanning')}</p>
                                <p className={styles.deleteLink}>{t('previews.scanning.delete')}</p>
                            </>
                            }
                            {OCR_INCOMPLETE_STATUSES.includes(receipt.status) &&
                            <>
                                <p>{t('previews.scanning.new')}</p>
                                <a onClick={() => {
                                    // ToDo: 'what happens when a scanning is cancelled?'
                                    console.log('what happens when a scanning is cancelled?');
                                }}>{t('previews.scanning.cancel')}</a>
                            </>
                            }
                            {OCR_ERROR_STATUSES.includes(receipt.status) &&
                            <p className={styles.errorText}>
                                {t('previews.scanning.error')}
                            </p>
                            }
                        </div>
                        {receipt.previewUrl &&
                        <div className={styles.thumbnail}>
                            <img src={receipt.previewUrl}/>
                        </div>
                        }
                        {!receipt.previewUrl &&
                        <Loader/>
                        }
                    </div>
                ))}
                {showAddReceipt &&
                <div className={`${styles.receiptPreview} ${styles.addNewPanel}`}>
                    <div className={styles.text}>
                        <p className={styles.addNew}>{t('previews.scanning.addNew')}</p>
                    </div>
                    <div className={styles.thumbnail}>
                        <PlusCircle className={styles.icon}/>
                    </div>
                </div>
                }
            </div>
            <div className={styles.startScanLeader}>
                {t('previews.scanning.start')}
            </div>
        </>
    );
};

export default ReceiptPreviews;
