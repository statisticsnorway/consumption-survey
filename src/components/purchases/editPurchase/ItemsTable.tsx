import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'react-feather';
import { ItemType } from '../../../firebase/model/Purchase';
import NumberStepper from '../../common/form/NumberStepper';
import { krCents } from '../../../utils/jsUtils';

import styles from './items.module.scss';

export type ItemsTableProps = {
    items: ItemType[];
    showTotal?: boolean;
    ocrTotal?: string;
    showAddNewItem?: boolean;
}

const ItemsTable = ({items, ocrTotal = null, showTotal = true, showAddNewItem = true}: ItemsTableProps) => {
    const {t} = useTranslation('purchases');
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        if (items) {
            const total = items.reduce((acc, item) =>
                acc + Number(item.amount) * Number(item.qty), 0);
            setTotalAmount(total);
        }
    }, [items]);

    return (
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
                {(items || []).map((item) => (
                    <tr>
                        <td
                            className={styles.itemName}
                            onClick={() => {
                            }}
                        >
                            {item.name}
                        </td>
                        <td className={styles.itemQtyGroup}>
                            <NumberStepper
                                initialValue={Number(item.qty)}
                                onChange={(newValue) => {
                                    // onItemQtyChange(item, newValue);
                                }}
                                min={1}
                                deleteConfirmProps={{
                                    title: t('deleteItem.title'),
                                    text: t('deleteItem.text'),
                                    entityInfo: `${item.name} (${item.qty} stk)`,
                                    textWarning: t('deleteItem.textWarning'),
                                    confirmText: t('deleteItem.confirmText'),
                                    cancelText: t('deleteItem.cancelText'),
                                }}
                            />
                        </td>
                        <td
                            className={styles.unitPrice}
                            onClick={() => {
                                // onItemRowClick(item);
                            }}
                        >
                            {krCents(item.amount)}
                        </td>
                    </tr>
                ))}
                {showAddNewItem &&
                <tr className={styles.addNewRow}>
                    <td
                        colSpan={3}
                        onClick={() => {
                            console.log('toggling new item flag');
                            // setShowNewItem(true);
                        }}
                    >
                        {t('lineItems.addNew')}
                        <PlusCircle className={styles.icon}/>
                    </td>
                </tr>
                }
                {items && showTotal &&
                <tr className={styles.totalRow}>
                    <td className={styles.itemName}>{t('lineItems.total')}</td>
                    <td className={styles.itemQtyGroup}>{`${items.length} vare${(items.length > 1) ? 'r' : ''}`}</td>
                    <td className={styles.totalAmount}>{ocrTotal || krCents(totalAmount)}</td>
                </tr>
                }
                </tbody>
            </table>
        </div>
    );
};

export default ItemsTable;
