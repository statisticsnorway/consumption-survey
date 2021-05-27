import { ReceiptInfo } from '../../../firebase/model/Purchase';

import styles from './receiptPreview.module.scss';

export enum ReceiptPreviewSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    FULLSCREEN = 'fullscreen'
};

export type ReceiptPreviewProps = {
    receipt: ReceiptInfo;
    size: ReceiptPreviewSize;
}

const ReceiptPreview = ({ receipt, size = ReceiptPreviewSize.MEDIUM}: ReceiptPreviewProps) => {
    return <p>Preview here</p>;
};

export default ReceiptPreview;
