import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { UploadTaskSnapshot } from '@firebase/storage-types'
import uuid from 'uuid';
import ScanReceiptBlock from './ScanReceiptBlock';
import FullscreenLoader from '../../common/FullScreenLoader';
import useReceipts from '../../../hocs/useReceipts';
import { ADD_PURCHASE_MODES, PATHS } from '../../../uiConfig';
import { PurchaseStatus, PurchaseType, ReceiptInfo, ReceiptStatus } from '../../../firebase/model/Purchase';
import { getContentType } from '../../../utils/imgUtils';
import usePurchases from '../../../hocs/usePurchases';

export type AddPurchaseProps = {
    onDate?: string
    mode?: string;
};

const INIT_STATE = (onDate): PurchaseType => ({
    name: '',
    purchaseDate: onDate,
    status: PurchaseStatus.CREATED,
    receipts: null,
    items: null,
});

const AddPurchase = ({onDate = null, mode = ADD_PURCHASE_MODES.SCAN}: AddPurchaseProps) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');

    // main state
    const [values, setValues] = useState<PurchaseType>(INIT_STATE(onDate || new Date().toISOString()));

    // receipts UI
    const [launchCamera, setLaunchCamera] = useState(mode === ADD_PURCHASE_MODES.SCAN);

    // receipts & purchases handling
    const {saveImageBlobToPouchDB, uploadToFireStorage, notifyReceipt} = useReceipts();
    const {initPurchase, editPurchase} = usePurchases();

    /* -----------------------------
     * Loaders & Messages
     * ----------------------------- */
    const [showLoader, setShowLoader] = useState(false);
    const [loaderMessge, setLoaderMessage] = useState<string>(null);

    const clearMessages = () => {
        setShowLoader(false);
        setLoaderMessage('');
    };

    const showMessage = (msg) => {
        setShowLoader(true);
        setLoaderMessage(msg);
    };

    const cleanup = () => {
        clearMessages();
    }

    /**
     * Handle new receipt added
     * @param imageName : name of the receipt
     * @param image : blob containing the image
     */
    const onReceiptAdded = (imageName, image) => {
        console.log('[rcpt added]');
        setLaunchCamera(false);

        showMessage(t('addPurchase.progress.saveImage'));

        const imageId = uuid();
        saveImageBlobToPouchDB(imageId, imageName, image)
            .then(async res => {
                console.log('image saved locally');
                const newList: ReceiptInfo[] = (values.receipts || []);
                newList.push({
                    imageId,
                    imageName,
                    image,
                    contentType: getContentType(imageName),
                    previewUrl: URL.createObjectURL(image),
                    status: ReceiptStatus.CREATED
                });
                setValues({
                    ...values,
                    receipts: newList,
                });

                clearMessages();
            });
    };

    const onCancel = () => {
        setLaunchCamera(false);
        router.back();
    };

    const onSuccessfulAdd = ({highlight}) => {
        cleanup();
        const highlightParam = highlight ? `highlight=${highlight}` : '';
        console.log(`Purchase ${highlight} should be listed and highlighted`);
        router.push(`${PATHS.CONSUMPTION}?${highlightParam}`);
    };

    const savePurchaseByReceipt = (receipt: ReceiptInfo) => {
        const {imageId, imageName, image, contentType, status} = receipt;
        showMessage(t('addPurchase.progress.uploadReceipt'));
        initPurchase()
            .then(docRef => {
                uploadToFireStorage(
                    docRef.id,
                    imageName,
                    image,
                    contentType
                )
                    .then((uploadSnapshot: UploadTaskSnapshot) => {
                        console.log('upload details', uploadSnapshot);
                        const {bucket, fullPath, name} = uploadSnapshot.metadata;
                        const metadata = {bucket, fullPath, name, contentType};
                        console.log('metadata', metadata);

                        notifyReceipt(docRef.id, imageName, metadata)
                            .then((rcptSnap) => {
                                console.log('notification EP setup .. check CF', rcptSnap);
                                editPurchase(docRef.id, {
                                    status: PurchaseStatus.OCR_IN_PROGRESS,
                                    // Todo: Rename this to 'receiptsMeta'
                                    receipts: [{imageName, contentType, imageId, status}]
                                })
                                    .then(() => {
                                        onSuccessfulAdd({highlight: docRef.id});
                                    })
                            })
                    })
            })
    }

    const savePurchaseByReceipts = () => {
        savePurchaseByReceipt(values.receipts[0]);
    }

    return (
        <>
            {(mode === ADD_PURCHASE_MODES.SCAN) &&
            <>
                <ScanReceiptBlock launchCamera={launchCamera} onReceiptAdded={onReceiptAdded}/>
                {values.receipts && (values.receipts.length > 0) &&
                    <button className={`ssb-btn primary-btn`} onClick={savePurchaseByReceipts}>
                        Registrer utgift
                    </button>
                }
            </>
            }
            {(mode === ADD_PURCHASE_MODES.MANUAL) &&
            <p>Manual</p>
            }
            <FullscreenLoader show={showLoader} loaderMessage={loaderMessge}/>
        </>
    );
};

export default AddPurchase;
