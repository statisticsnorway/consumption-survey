import { RefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Camera } from 'react-feather';
import MediaInput from '../../common/media/MediaInput';
import { ADD_PURCHASE_MODES, PATHS } from '../../../uiConfig';

import styles from './addPurchase.module.scss';
import { useTranslation } from 'react-i18next';
import ScanReceiptBlock from './ScanReceiptBlock';

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

    return (
        <>
            {(mode === ADD_PURCHASE_MODES.SCAN) &&
            <ScanReceiptBlock launchCamera={launchCamera} onReceiptAdded={onReceiptAdded}/>
            }
            {(mode === ADD_PURCHASE_MODES.MANUAL) &&
            <p>Manual</p>
            }
        </>
    );
};

export default AddPurchase;
