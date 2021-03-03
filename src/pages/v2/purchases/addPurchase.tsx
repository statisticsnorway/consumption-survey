import { useRouter } from 'next/router';
import AddPurchase from '../../../components/v2/purchases/AddPurchase';

const AddPurchasePage = () => {
    const router = useRouter();
    const onDate = router.query.onDate as string;

    return <AddPurchase onDate={onDate} />
};

export default AddPurchasePage;
