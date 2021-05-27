import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { PurchaseStatus, PurchaseType } from '../../../firebase/model/Purchase';

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

const AddPurchase = ({onDate = null}: AddPurchaseProps) => {
    const router = useRouter();
    const {t} = useTranslation('purchases');

    // main state
    const [values, setValues] = useState<PurchaseType>(INIT_STATE(onDate || new Date().toISOString()));


    return (
        <>
            <p>Manual</p>
        </>
    );
};

export default AddPurchase;
