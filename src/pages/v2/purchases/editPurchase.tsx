import { useRouter } from 'next/router';
import EditPurchase from '../../../components/v2/purchases/EditPurchase';

const EditPurchasePage = () => {
    const router = useRouter();
    const purchaseId = router.query.purchaseId as string;

    return (
        <EditPurchase purchaseId={purchaseId} />
    );
};

export default EditPurchasePage;
