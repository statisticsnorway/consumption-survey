import { useTranslation } from 'react-i18next';
import NewPurchase from '../../components/purchases/NewPurchase';

const NewPurchasePage = ({searchTerms}) => {
    const {t} = useTranslation('purchases');

    return <NewPurchase initialSearchTerms={searchTerms}/>;
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
