import { useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { ItemType } from '../../../firebase/model/Purchase';

import styles from './styles/items.module.scss';
import { krCents } from '../../../utils/jsUtils';
import Loader from '../../common/Loader';
import NumberStepper from '../../common/stepper/NumberStepper';
import EditItem from './EditItem';

export type ItemsTableProps = {
    items: ItemType[];
    showAddNewItem?: boolean;
    showTotal?: boolean;
    onItemQtyChange: (item: ItemType, newValue: number) => void;
    onItemUpdate: (oldValues: ItemType, newValues: ItemType) => void;
    ocrTotal?: string;
    onNewItem: (values: ItemType) => void;
};

const INIT_STATE: ItemType = {
    id: null,
    idx: -1,
    name: '',
    qty: '1',
    units: 'stk',
    amount: '',
    code: null,
    searchTermId: null,
};

const ItemsTable = ({
                        items,
                        ocrTotal,
                        onItemQtyChange,
                        onItemUpdate,
                        showAddNewItem = true,
                        onNewItem,
                        showTotal = true
                    }: ItemsTableProps) => {
    const {t} = useTranslation('purchases');
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [showEditItem, setShowEditItem] = useState(false);
    const [itemForEdit, setItemForEdit] = useState<ItemType>(null);
    const [newItem, setNewItem] = useState<ItemType>(INIT_STATE);
    const [showNewItem, setShowNewItem] = useState(false);

    useEffect(() => {
        if (items) {
            const total = items.reduce((acc, item) =>
                acc + Number(item.amount) * Number(item.qty), 0);
            setTotalAmount(total);
        }
    }, [items]);

    const onItemRowClick = (item) => {
        console.log('should show item', item);
        setItemForEdit(item);
        setShowEditItem(true);
    };

    const onItemUpdated = (oldValues, newValues) => {
        console.log(oldValues, '=>', newValues);
        onItemUpdate(oldValues, newValues);
    };

    const clearNewItem = () => {
        setShowNewItem(false);
        setNewItem(INIT_STATE);
    };

    const onNewItemUpdated = (oldValues, newValues) => {
        console.log('new Item', newValues);
        clearNewItem();
        onNewItem(newValues);
    };

    const onItemEditCancel = () => {
        setShowEditItem(false);
        setItemForEdit(null);
    };

    const onNewItemCancel = () => {
        clearNewItem();
    };

    console.log('new item flag', showNewItem);

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
                                onItemRowClick(item);
                            }}
                        >
                            {item.name}
                        </td>
                        <td className={styles.itemQtyGroup}>
                            <NumberStepper
                                initialValue={Number(item.qty)}
                                onChange={(newValue) => {
                                    onItemQtyChange(item, newValue);
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
                                onItemRowClick(item);
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
                            setShowNewItem(true);
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
            <EditItem
                item={itemForEdit}
                show={showEditItem}
                onUpdate={onItemUpdated}
                onCancel={onItemEditCancel}
            />
            <EditItem
                item={newItem}
                show={showNewItem}
                onUpdate={onNewItemUpdated}
                onCancel={onNewItemCancel}
            />
        </div>
    );
};

export default ItemsTable;
