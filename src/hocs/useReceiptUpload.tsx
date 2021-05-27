import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import uuid from 'uuid';
import useReceipts from './useReceipts';
import usePurchases from './usePurchases';
import { PurchaseStatus, ReceiptInfo, ReceiptStatus } from '../firebase/model/Purchase';
import { getContentType } from '../utils/imgUtils';
import { LayoutContext } from '../uiContexts';

const useReceiptUpload = (onSuccessfulAdd) => {
    const {saveImageBlobToPouchDB, uploadToFireStorage, notifyReceipt} = useReceipts();
    const {initPurchase, editPurchase} = usePurchases();
    const {t} = useTranslation('purchases');
    const {showMessage, clearMessages} = useContext(LayoutContext);
    const [receipt, setReceipt] = useState<ReceiptInfo>(null);
    const inputRef = useRef(null);
    const [showOpenFileDialog, setShowOpenFileDialog] = useState(false);

    useEffect(() => {
        console.log('[HOC RU]', showOpenFileDialog, hiddenUploadComponent, inputRef);
        if (showOpenFileDialog) {
            inputRef.current.click();
        }
    }, [showOpenFileDialog]);

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            onReceiptAdded(image.name, image);
        }

        setShowOpenFileDialog(false);
    };

    const onReceiptAdded = async (imageName, image) => {
        console.log('[rcpt added]');

        await showMessage(t('addPurchase.progress.saveImage'));

        const imageId = uuid();
        saveImageBlobToPouchDB(imageId, imageName, image)
            .then(async res => {
                console.log('image saved locally');
                setReceipt({
                    imageId,
                    imageName,
                    image,
                    contentType: getContentType(imageName),
                    previewUrl: URL.createObjectURL(image),
                    status: ReceiptStatus.CREATED
                });

                clearMessages();
            });
    };

    const savePurchaseByReceipt = async (receipt: ReceiptInfo) => {
        const {imageId, imageName, image, contentType, status} = receipt;
        await showMessage(t('addPurchase.progress.uploadReceipt'));
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
                                        clearMessages();
                                        onSuccessfulAdd(docRef.id);
                                    })
                            })
                    })
            });
    };

    useEffect(() => {
        if (receipt) {
            console.log('saving receipt');
            savePurchaseByReceipt(receipt);
        } else {
            console.log('no receipt yet');
        }
    }, [receipt]);

    const hiddenUploadComponent = (
        <input
            id="receiptUpload"
            ref={inputRef}
            type="file"
            accept="image/*;capture=camera"
            onChange={onFileChange}
            style={{position: 'absolute', top: '-9999px'}}
        />
    );

    const openFileDialog = () => {
        inputRef.current.click();
    };

    const closeFileDialog = () => {
        setShowOpenFileDialog(false);
    };

    return {onReceiptAdded, savePurchaseByReceipt, openFileDialog, closeFileDialog, hiddenUploadComponent};
};

export default useReceiptUpload;
