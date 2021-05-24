import styles from './editPurchase.module.scss';
import { simpleFormat } from '../../../utils/dateUtils';

export type PurchaseMetaProps = {
    purchaseDate?: string;
    name?: string;
}
const PurchaseMeta = ({ purchaseDate, name }: PurchaseMetaProps) => {
    return (
        <>
            <span className={styles.purchaseDate}>{simpleFormat(new Date(purchaseDate))}</span>
            <span className={styles.name}>{name}</span>
        </>
    );
};

export default PurchaseMeta;
