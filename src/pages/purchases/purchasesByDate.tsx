import { useRouter } from 'next/router';
import PurchasesByDateComp from '../../components/purchases/PurchasesByDate';
import usePurchases from '../../mock/usePurchases';

const PurchasesByDate = () => {
    const router = useRouter();
    const {purchasesByDate} = usePurchases();
    const {date} = router.query;

    console.log('purchasesByDate', purchasesByDate);
    console.log('purchases for ', date, purchasesByDate[date as string]);
    console.log('query', router.query);

    return (
        <PurchasesByDateComp
            date={date}
            purchases={purchasesByDate[date as string]}
        />
    );
};

export default PurchasesByDate;
