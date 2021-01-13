import { MinusCircle } from 'react-feather';
import { ItemType } from '../../firebase/model/Purchase';

import styles from './styles/itemsTable.module.scss';
import { krCents } from '../../utils/jsUtils';

export type ItemsTableProps = {
    items: ItemType[];
    onItemClick: (item) => void;
    onItemRemove: (item: ItemType) => void;
    showTotalRow?: boolean;
};

const ItemsTable = ({items, onItemClick, onItemRemove, showTotalRow = true}: ItemsTableProps) => {
    const renderCell = (item, cellStyle, cellContent) =>
        <td className={cellStyle} onClick={() => onItemClick(item)}>{cellContent}</td>;

    /*
    <th className={`${styles.qtyUnits} header`} colSpan={2}>Mengde</th>
                    {renderCell(item, styles.units, item.units)}
     */

    const total = items.reduce((acc, item) => acc + Number(item.amount), 0);

    return (
        <table className={styles.itemsTable}>
            <thead>
            <tr>
                <th className={`${styles.name} header`}>Vare</th>
                <th className={`${styles.price} header`}>Pris</th>
                <th className={`${styles.action}`}></th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                <tr key={item.id || item.idx}>
                    {renderCell(item, styles.name, item.name)}
                    {renderCell(item, styles.price, krCents(item.amount))}
                    <td className={styles.action}>
                        <MinusCircle
                            width={16} height={16}
                            className={styles.actionIcon}
                            onClick={() => { onItemRemove(item); }}
                        />
                    </td>
                </tr>
            ))}
            {showTotalRow && (items.length > 0) &&
                <tr key="total" className={styles.totalRow}>
                    <td>
                        Sum
                    </td>
                    <td className={styles.total}>
                        {krCents(total)}
                    </td>
                    <td></td>
                </tr>
            }
            </tbody>
        </table>
    );
};

export default ItemsTable;
