import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'react-feather';
import { PurchaseType } from '../../firebase/model/Purchase';

import styles from './styles/purchasesTable.module.scss';
import { krCents } from '../../utils/jsUtils';

export type PurchasesTableProps = {
    purchases: PurchaseType[];
}

const PurchasesTable = ({purchases}: PurchasesTableProps) => {
    const {t} = useTranslation('purchases');

    if (!purchases || !Array.isArray(purchases) || (purchases.length < 1)) {
        return (
            <p>{t('noRecords')}</p>
        );
    }

    return (
        <div className={styles.purchasesTable}>
            {purchases.map(purchase => (
                <Link href={`/purchases/editPurchase?purchaseId=${purchase.id}`}>
                    <a className={styles.purchaseRow}>
                        <div className={styles.purchaseName}>{purchase.where}</div>
                        <div className={styles.purchaseAmount}>{krCents(Number(purchase.totalPrice))}</div>
                        <div className={styles.purchaseDetailsIcon}>
                            <ChevronRight
                                width={20}
                                height={20}
                            />
                        </div>
                    </a>
                </Link>
            ))}
        </div>
    );
};

export default PurchasesTable;
