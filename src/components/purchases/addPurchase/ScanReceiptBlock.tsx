import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera } from 'react-feather';
import MediaInput from '../../common/media/MediaInput';

import styles from './addPurchase.module.scss';

export type ScanReceiptBlockProps = {
    launchCamera: boolean;
    onReceiptAdded: (imageName: string, imageBlob: Blob) => void;
}

const ScanReceiptBlock = ({launchCamera = true, onReceiptAdded}: ScanReceiptBlockProps) => {
    const {t} = useTranslation('purchases');

    const receiptRef = useRef<HTMLInputElement>();
    const [receiptName, setReceiptName] = useState<string>(null);

    const addReceiptButtonRef = useRef<HTMLButtonElement>();
    useEffect(() => {
        if (launchCamera) {
            console.log('launching camera');
            addReceiptButtonRef.current.click();
        }
    }, []);

    const handleFileSelect = (imageName, imageBlob) => {
        setReceiptName(imageName);
        onReceiptAdded(imageName, imageBlob);
    };

    return (
        <>
            {launchCamera && !receiptName &&
            <>
                <p>Camera</p>
                <MediaInput
                    inputRef={receiptRef}
                    handleFileSelect={handleFileSelect}
                    launchCamera={launchCamera}
                />
                <button
                    className={styles.addReceiptBlock}
                    ref={addReceiptButtonRef}
                    onClick={() => {
                        receiptRef.current && receiptRef.current.click();
                    }}
                >
                    <Camera className={styles.icon}/>
                    <span className={styles.text}>{t('addPurchase.addReceipt')}</span>
                </button>
            </>
            }
            {!launchCamera && receiptName && <p>{receiptName}</p>}
        </>
    );
};

export default ScanReceiptBlock;
