import { ReceiptInfo } from '../../../firebase/model/Purchase';
import ReceiptPopup from '../../receipts/ReceiptPopup';
import { useState } from 'react';
import styles from '../styles/editPurchase.module.scss';

export type ReceiptPreviewProps = {
    receipts: ReceiptInfo[];
    text: string;
}

const ReceiptPreview = ({receipts, text}: ReceiptPreviewProps) => {
    const [showReceiptPopup, setShowReceiptPopup] = useState<boolean>(false);

    return (receipts && receipts.length > 0) ? (
        <>
            <div className={styles.receiptPreview} onClick={() => {
                setShowReceiptPopup(true);
            }}>
                {receipts[0].previewUrl && <img src={receipts[0].previewUrl} className={styles.thumbnail}/>}
                <span className={styles.infoText}>{text}</span>
            </div>
            <ReceiptPopup
                show={showReceiptPopup}
                receipt={receipts[0]}
                onClose={() => {
                    setShowReceiptPopup(false);
                }}
                onCancel={() => {
                    setShowReceiptPopup(false);
                }}
            />
        </>
    ) : null;
};

export default ReceiptPreview;
