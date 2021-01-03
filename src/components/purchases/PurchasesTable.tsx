import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'react-feather';
import { PurchaseType } from '../../firebase/model/Purchase';

import styles from './styles/purchasesTable.module.scss';
import { useRouter } from 'next/router';

export type PurchasesTableProps = {
    purchases: PurchaseType[];
}

const PurchasesTable = ({ purchases }: PurchasesTableProps) => {
    const {t} = useTranslation('purchases');
    const router = useRouter();

    if (!purchases || !Array.isArray(purchases) || (purchases.length < 1)) {
        return (
            <p>{t('noRecords')}</p>
        );
    }

    return (
        <div className={styles.purchasesTable}>
            {purchases.map(purchase => (
                <div className={styles.purchaseRow}>
                    <div className={styles.purchaseName}>{purchase.where}</div>
                    <div className={styles.purchaseAmount}>{purchase.totalPrice}</div>
                    <div className={styles.purchaseDetailsIcon}>
                        <ChevronRight
                            width={20}
                            height={20}
                            onClick={() => {
                                router.push(`/purchases/editPurchase?purchaseId=${purchase.id}`);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PurchasesTable;
