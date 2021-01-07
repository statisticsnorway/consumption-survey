import { useRouter } from 'next/router';
import EditPurchase from '../../components/purchases/EditPurchase';

const EditPurchasePage = () => {
    const router = useRouter();
    const purchaseId = router.query.purchaseId as string;
    const onDate = router.query.onDate as string;

    return (
        <EditPurchase purchaseId={purchaseId} onDate={onDate}/>
    );
};

export default EditPurchasePage;
