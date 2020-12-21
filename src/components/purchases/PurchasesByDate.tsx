import { PurchaseType } from '../../firebase/model/Purchase';
import PurchasesTable from './PurchasesTable';

export type PurchasesByDateProps = {
    date: string;
    purchases: PurchaseType[];
}

const PurchasesByDate = ({date, purchases}) => {
    return (
        <>
            <p>{date}</p>
            <PurchasesTable purchases={purchases}/>
        </>
    );
};

export default PurchasesByDate;
