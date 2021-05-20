import { RefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Camera } from 'react-feather';
import MediaInput from '../common/MediaInput';
import { ADD_PURCHASE_MODES, PATHS } from '../../uiConfig';

import styles from './styles/addPurchase.module.scss';
import { useTranslation } from 'react-i18next';

export type AddPurchaseProps = {
    onDate?: string
    mode?: string;
};

const AddPurchase = ({onDate = null, mode = ADD_PURCHASE_MODES.SCAN}: AddPurchaseProps) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');
    const [launchCamera, setLaunchCamera] = useState(mode === ADD_PURCHASE_MODES.SCAN);

    const receiptRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const [receiptName, setReceiptName] = useState<string>(null);
    const [receiptBlob, setReceiptBlob] = useState<Blob>(null);

    const onReceiptAdded = (imageName, image) => {
        console.log('[rcpt added]');
        setReceiptName(imageName);
        setReceiptBlob(image);
        setLaunchCamera(false);
    };

    const onCancel = () => {
        setLaunchCamera(false);
        router.back();
    };

    console.log('state', launchCamera, receiptName);

    return (
        <>
            {(mode === ADD_PURCHASE_MODES.SCAN) &&
            <>
                {launchCamera && !receiptName &&
                <>
                    <p>Camera</p>
                    <MediaInput
                        inputRef={receiptRef}
                        handleFileSelect={onReceiptAdded}
                        launchCamera={launchCamera}
                    />
                    <div
                        className={styles.addReceiptBlock}
                        onClick={() => {
                            receiptRef.current && receiptRef.current.click();
                        }}
                    >
                        <Camera className={styles.icon}/>
                        <span className={styles.text}>{t('addPurchase.addReceipt')}</span>
                    </div>
                </>
                }
                {!launchCamera && receiptName && <p>{receiptName}</p>}
            </>
            }
            {(mode === ADD_PURCHASE_MODES.MANUAL) &&
            <p>Manual</p>
            }
        </>
    );
};

export default AddPurchase;
