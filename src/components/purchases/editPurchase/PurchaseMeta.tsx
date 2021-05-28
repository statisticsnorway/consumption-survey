import LabelledInput from '../../common/form/LabelledInput';
import { useTranslation } from 'react-i18next';
import { notEmptyString } from '../../../utils/jsUtils';
import LabelledDatePicker from '../../common/form/LabelledDatePicker';

import styles from '../styles/editPurchase.module.scss';

export type PurchaseMetaProps = {
    purchaseDate?: string;
    registeredTime: string;
    name?: string;
    onUpdate: (object) => void;
}
const PurchaseMeta = ({purchaseDate, registeredTime, name, onUpdate}: PurchaseMetaProps) => {
    const {t} = useTranslation('purchases');

    const handleUpdate = (key) => (value) => {
        onUpdate({ [key]: value})
    };

    return (
        <>
            <LabelledDatePicker
                id="purchaseDate"
                label={t('addPurchase.purchaseDate.label')}
                value={purchaseDate}
                validate={(dt) => dt && dt !== registeredTime}
                errorText={t('addPurchase.purchaseDate.error')}
                onChange={handleUpdate('purchaseDate')}
            />
            <LabelledInput
                id="name"
                label={t('addPurchase.purchaseName.label')}
                value={name}
                validate={nm => notEmptyString(nm) && (nm !== '??')}
                errorText={t('addPurchase.purchaseName.errorText')}
                onChange={handleUpdate('name')}
                styleClass={styles.name}
            />
        </>
    );
};

export default PurchaseMeta;
