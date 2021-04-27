import styles from './styles/purchases.module.scss';
import PurchasesList from './PurchasesList';
import NewPurchaseFromReceiptIcon from '../../common/icons/NewPurchaseFromReceiptIcon';
import { useTranslation } from 'react-i18next';
import FbuIcon from '../../common/FbuIcon';
import { useRouter } from 'next/router';
import { PATHS } from '../../../uiConfig';

export type PurchasesProps = {
    highlight?: string;
};

const Purchases = ({ highlight = undefined }: PurchasesProps) => {
    const {t} = useTranslation('purchases');
    const router = useRouter();

    return (
        <div className={styles.purchases}>
            <button
                className={`ssb-btn secondary-btn ${styles.btnAddNewFromReceipt}`}
                onClick={() => { router.push(PATHS.ADD_PURCHASE); }}
            >
                <NewPurchaseFromReceiptIcon className={styles.icon}/>
                {t('addPurchase.fromReceipt')}
            </button>
            <button className={`ssb-btn secondary-btn ${styles.btnAddNewManually}`}>
                <FbuIcon name={'PlusCircle'} className={styles.icon}/>
                {t('addPurchase.manually')}
            </button>
            <PurchasesList highlight={highlight} />
        </div>
    );
};

export default Purchases;
