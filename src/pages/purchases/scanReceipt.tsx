import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

const ScanReceiptsNoSSR = dynamic(
    () => import('../../components/purchases/ScanReceipts'),
    {ssr: false}
);

const ScanReceiptPage = () => {
    const {t} = useTranslation('receipts');

    return (
        <ScanReceiptsNoSSR/>
    )
};

export default ScanReceiptPage;
