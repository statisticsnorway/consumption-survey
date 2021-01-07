import { MinusCircle } from 'react-feather';
import { ItemType } from '../../firebase/model/Purchase';

import styles from './styles/itemsTable.module.scss';

export type ItemsTableProps = {
    items: ItemType[];
    onItemClick: (item) => void;
    onItemRemove: (item: ItemType) => void;
};

const ItemsTable = ({items, onItemClick, onItemRemove}: ItemsTableProps) => {
    const renderCell = (item, cellStyle, cellContent) =>
        <td className={cellStyle} onClick={() => onItemClick(item)}>{cellContent}</td>;

    return (
        <table className={styles.itemsTable}>
            <thead>
            <tr>
                <th className={`${styles.name} header`}>Vare</th>
                <th className={`${styles.qtyUnits} header`} colSpan={2}>Mengde</th>
                <th className={`${styles.price} header`}>Pris</th>
                <th className={`${styles.action}`}></th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                <tr key={item.id || item.idx}>
                    {renderCell(item, styles.name, item.name)}
                    {renderCell(item, styles.units, item.units)}
                    {renderCell(item, styles.price, `${item.kr},${item.cents}`)}
                    <td className={styles.action}>
                        <MinusCircle
                            width={16} height={16}
                            className={styles.actionIcon}
                            onClick={() => { onItemRemove(item); }}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ItemsTable;
