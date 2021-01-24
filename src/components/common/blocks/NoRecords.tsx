import { useTranslation } from 'react-i18next';

import styles from './noRecords.module.scss';

export type NoRecordsProps = {
    singularText: string;
    pluralText: string;
    showAddNew?: boolean;
};

const NoRecords = ({singularText, pluralText, showAddNew = true}: NoRecordsProps) => {
    const {t} = useTranslation('common');

    const noRecordsText = `${t('noRecords.prefix')} ${pluralText} ${t('noRecords.suffix')}`;
    const addNewText = `${t('noRecords.addNewPrefix')} ${singularText} ${t('noRecords.addNewSuffix')}`;

    return (
        <div className={styles.noRecords}>
            <span className={styles.noRecordsText}>{noRecordsText}</span>
            {showAddNew && <span className={styles.addNew}>{addNewText}</span>}
        </div>
    );
}

export default NoRecords;
