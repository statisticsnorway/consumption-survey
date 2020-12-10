import { MinusCircle } from 'react-feather';
import { ItemType } from '../../firebase/model/Purchase';

import styles from './styles/itemsTable.module.scss';

export type ItemsTableProps = {
    items: ItemType[];
    onItemRemove: (item: ItemType) => void;
};

const ItemsTable = ({items, onItemRemove}: ItemsTableProps) => {
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
                    <td className={styles.name}>{item.name}</td>
                    <td className={styles.qty}>{item.qty}</td>
                    <td className={styles.units}>{item.units}</td>
                    <td className={styles.price}>{`${item.kr},${item.cents}`}</td>
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
