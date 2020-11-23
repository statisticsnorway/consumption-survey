import styles from './purchases.module.scss';
import { useTranslation } from 'react-i18next';

export type ItemType = {
    name: string;
    quantity: number;
    price: number;
};

export type PurchaseType = {
    id: string;
    items: [ItemType];
    when: Date;
};

export type PurchasesListProps = {
    purchases: PurchaseType[];
}

const PurchasesList = ({ purchases } : PurchasesListProps) => {
    const {t} = useTranslation('purchases');
    return (
        <div className={styles.purchasesList}>
            {purchases.map(purchase => {
                return (
                    <div style={{display: 'block'}}>
                        <p>id: {purchase.id}</p>
                        <p>{t('when')}: {purchase.when}</p>
                        <p>#items: {purchase.items.length}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default PurchasesList;
