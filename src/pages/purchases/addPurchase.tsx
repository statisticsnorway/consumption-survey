import axios from 'axios';
import { useTranslation } from 'react-i18next';
import NewPurchase from '../../components/purchases/NewPurchase';
import { WorkspacePanel } from '../../components/layout/Workspace';
import styles from '../../components/purchases/purchases.module.scss';

const NewPurchasePage = ({searchTerms}) => {
    const {t} = useTranslation('purchases');

    return (
        <div className={styles.addPurchase}>
            <h3>{t('addPurchase.title')}</h3>
            <NewPurchase initialSearchTerms={searchTerms}/>
        </div>
    );
};

/*
export async function getStaticProps() {
    const SEARCH_TERMS_URL = `${process.env.SURVEY_SERVICE_HOST}/v1/search-terms`;

    console.log('Fetching from ', SEARCH_TERMS_URL);
    const res = await axios.get(SEARCH_TERMS_URL, {})
    const searchTerms = await res.data;

    console.log(`Read in ${searchTerms.length} searchTerms`);

    return {
        props: {
            searchTerms
        }
    }
};
 */

export default NewPurchasePage;
