import { useRouter } from 'next/router';
import PurchasesByDateComp from '../../components/purchases/PurchasesByDate';
import usePurchases from '../../mock/usePurchases';
import { useState } from 'react';

const PurchasesByDate = () => {
    const router = useRouter();
    const {purchasesByDate} = usePurchases();
    const [date, setDate] = useState(router.query['date'] as string || null);

    console.log('purchasesByDate', purchasesByDate);
    console.log('purchases for ', date, purchasesByDate[date as string]);
    console.log('query', router.query);

    return (
        <PurchasesByDateComp
            date={date}
            purchases={purchasesByDate[date]}
            deselectDate={() => { setDate(null); }}
            selectDate={setDate}
        />
    );
};

export default PurchasesByDate;
