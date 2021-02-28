import { TextField } from '@material-ui/core';
import { Camera, Edit3 } from 'react-feather';
import { INPUT_CHANGE_HANDLER } from '../../../uiConfig';

import styles from './styles/addPurchase.module.scss';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { ReceiptInfo } from '../../../firebase/model/Purchase';

export type AddPurchaseTitleZoneProps = {
    name: string;
    date: string;
    receipts: ReceiptInfo[];
    onAddReceipt: (imageName: string, image: Blob) => void;
    updateField: (fieldName: string) => INPUT_CHANGE_HANDLER;
};

const AddPurchaseTitleZone = ({updateField, name, date, receipts, onAddReceipt}: AddPurchaseTitleZoneProps) => {
    const {t} = useTranslation('purchases');
    const mediaInputRef = useRef(null);

    const onFileSelected = async (e) => {
        const image = e.target.files[0];
        onAddReceipt(image.name, image);
    };

    return (
        <div className={styles.titleZone}>
            <div className={styles.nameAndDate}>
                <TextField
                    value={date}
                    onChange={updateField('purchaseDate')}
                    placeholder={t('addPurchase.purchaseDate.placeholder')}
                />

                <TextField
                    value={name}
                    onChange={updateField('name')}
                    placeholder={t('addPurchase.purchaseName.placeholder')}
                />
            </div>

            <div className={styles.receipts}>
                <div className={styles.placeHolder}>
                    {!receipts &&
                    <>
                        <input
                            ref={mediaInputRef}
                            type="file"
                            accept="image/*;capture=camera"
                            style={{display: 'none'}}
                            onChange={onFileSelected}
                        />
                        <Camera
                            className={styles.icon}
                            onClick={() => {
                                mediaInputRef.current && mediaInputRef.current.click()
                            }}
                        />
                    </>
                    }
                    {receipts && Array.isArray(receipts) && (receipts.length >= 1) &&
                        <img src={receipts[0].previewUrl} />

                    }
                </div>
            </div>
        </div>
    );
};

export default AddPurchaseTitleZone;
