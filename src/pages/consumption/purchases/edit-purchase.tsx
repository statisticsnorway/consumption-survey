import { useRouter } from 'next/router';
import EditPurchase from '../../../components/purchases/EditPurchase';
import OpLayout from '../../../components/layout/OpLayout';

const EditPurchasePage = () => {
    const router = useRouter();
    const {purchaseId} = router.query;

    try {
        return (
            /**
             * Ideally this should be returning a workspace component.
             * However we do not yet have a good way of managing different layouts
             * for different pages. Hence delegating it to the child component instead
             *
             * ToDo: better Component.getLayout and per-page (per-page-group) layouts
             */
            <EditPurchase purchaseId={purchaseId as string}/>
        );
    } catch (err) {
        console.log('error while rendering page', err);
        return <p>Error: {JSON.stringify(err)}</p>
    }
};

EditPurchasePage.getLayout = (children) =>
    <OpLayout showAppHeader={false}>{children}</OpLayout>;

export default EditPurchasePage;
