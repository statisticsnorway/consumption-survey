import { useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { ItemType } from '../../../firebase/model/Purchase';

import styles from './styles/items.module.scss';
import { krCents } from '../../../utils/jsUtils';
import Loader from '../../common/Loader';

export type ItemsTableProps = {
    items: ItemType[];
    showAddNewItem?: boolean;
    showTotal?: boolean;
};

const ItemsTable = ({ items, showAddNewItem = true, showTotal = true }: ItemsTableProps) => {
    const {t} = useTranslation('purchases');
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        if (items) {
            const total = items.reduce((acc, item) =>
                acc + Number(item.amount) * Number(item.qty), 0);
            setTotalAmount(total);
        }
    }, [items]);

    return items ? (
        <div className={styles.items}>
            <table
                className={styles.itemsTable}
                cellSpacing={0} cellPadding={0}
            >
                <thead>
                    <tr>
                        <th className={styles.itemName}>{t('lineItems.table.name')}</th>
                        <th className={styles.itemQtyGroup}>{t('lineItems.table.qty')}</th>
                        <th className={styles.unitPrice}>{t('lineItems.table.unitPrice')}</th>
                    </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr>
                        <td className={styles.itemName}>{item.name}</td>
                        <td className={styles.itemQtyGroup}>{item.qty}</td>
                        <td className={styles.unitPrice}>{krCents(item.amount)}</td>
                    </tr>
                ))}
                {showAddNewItem &&
                    <tr className={styles.addNewRow}>
                        <td colSpan={3}>
                            {t('lineItems.addNew')}
                            <PlusCircle className={styles.icon} />
                        </td>
                    </tr>
                }
                {showTotal &&
                    <tr className={styles.totalRow}>
                        <td className={styles.itemName}>{t('lineItems.total')}</td>
                        <td className={styles.itemQtyGroup}>{`${items.length} vare(r)`}</td>
                        <td className={styles.totalAmount}>{krCents(totalAmount)}</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    ) : <Loader />;
};

export default ItemsTable;
