import Modal from '../../common/dialog/Modal';
import { ReceiptInfo } from '../../../firebase/model/Purchase';

import styles from './styles/receipts.module.scss';

export type ReceiptPopupProps = {
    show: boolean;
    receipt: ReceiptInfo;
    onClose: () => void;
    onCancel: () => void;
};

const ReceiptPopup = ({
                          show,
                          receipt,
                          onClose,
                      }: ReceiptPopupProps) => {
    return (
        <Modal
            show={show}
            showTitle={false}
            onClose={onClose}
            closeText="Lukk"
            showCancel={false}
            className={styles.receiptModal}
            fullScreen={true}
            showFooter={false}
        >
            <img
                src={receipt.previewUrl}
                className={styles.image}
                onClick={onClose}
            />
        </Modal>
    );
};

export default ReceiptPopup;
