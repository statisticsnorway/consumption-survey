import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import uuid from 'uuid';
import useReceipts from '../../../hocs/useReceipts';
import { PurchaseStatus, PurchaseType, ReceiptInfo, ReceiptStatus } from '../../../firebase/model/Purchase';
import AddPurchaseTitleZone from './AddPurchaseTitleZone';
import AddItemLeader from './AddItemLeader';
import ReceiptPreviews from './ReceiptPreviews';

import styles from './styles/addPurchase.module.scss';

export type AddPurchaseProps = {
    onDate: string;
};

const INIT_STATE: PurchaseType = {
    name: '',
    purchaseDate: null,
    status: PurchaseStatus.CREATED,
    receipts: null,
};

const AddPurchase = ({onDate}: AddPurchaseProps) => {
    const {t} = useTranslation('purchases');
    const [values, setValues] = useState<PurchaseType>(INIT_STATE);
    const {getReceiptFromPouchDB, saveImageBlobToPouchDB} = useReceipts();

    const updateField = (fieldName: keyof PurchaseType) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [fieldName]: e.target.value,
        });
    };

    const onAddItemClick = () => {
        console.log('add an item manually');
    };

    const onAddReceipt = (imageName: string, image: Blob) => {
        const imageId = uuid();
        saveImageBlobToPouchDB(imageId, imageName, image)
            .then(async res => {
                console.log('image stored locally');
                const newList: ReceiptInfo[] = (values.receipts || []);
                newList
                    .push({
                        imageId,
                        imageName,
                        image,
                        previewUrl: URL.createObjectURL(image),
                        status: ReceiptStatus.CREATED,
                    });
                setValues({
                    ...values,
                    receipts: newList,
                });
            })
    };

    // update image previews
    useEffect(() => {
        if (values.receipts) {

        }
    }, [values.receipts]);

    return (
        <div className={styles.addPurchase}>
            {!values.receipts &&
            <AddPurchaseTitleZone
                updateField={updateField}
                name={values.name}
                date={values.purchaseDate}
                receipts={values.receipts}
                onAddReceipt={onAddReceipt}
            />
            }
            {(!values.items && !values.receipts) &&
            <AddItemLeader onAddItemClick={onAddItemClick}/>
            }
            {values.receipts && Array.isArray(values.receipts) && (values.receipts.length > 0) &&
            <ReceiptPreviews receipts={values.receipts}/>
            }
            <div className={styles.footerZone}>
                <button
                    className={'ssb-btn primary-btn'}
                    disabled={!values.receipts || (values.receipts.length < 1)}
                >
                    {t('addPurchase.save')}
                </button>
            </div>
        </div>
    );
};

export default AddPurchase;
