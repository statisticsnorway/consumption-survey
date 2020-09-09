import { useState } from 'react';
import useAxios from 'axios-hooks';

const SURVEY_SERVICE_HOST = process.env.NEXT_PUBLIC_SURVEY_SERVICE_HOST || 'http://localhost:5555';
const COICOP_SEARCH_ENDPOINT = `${SURVEY_SERVICE_HOST}/coicop/v1/search`;

export const useCoicopSearch = (term) => {
    const [coicopSearchTerm, setCoicopSearchTerm] = useState(term);

    /*
    const COICOP_CONFIG = {
        method: 'GET',
        url: `${COICOP_SEARCH_ENDPOINT}?query=${coicopSearchTerm}`,
        options: {
            params: { coicopSearchTerm }
        },
        trigger: coicopSearchTerm,
        forceDispatchEffect: () => !!coicopSearchTerm
    };
    const { response: coicopFetchResponse, loading, error, refetch } = useAxios(COICOP_CONFIG);
    */

    const searchUrl = `${COICOP_SEARCH_ENDPOINT}?query=${coicopSearchTerm}`;
    const [{ data, loading, error}, refetch] = useAxios(searchUrl, { useCache: false });
    const coicopEntries = data ? data : [];

    console.log('fetched coicop entries', coicopEntries);

    const coicopUpdate = (v) => setCoicopSearchTerm(v);
    console.log('coicop term', coicopSearchTerm);

    return {
        coicopSearchTerm,
        setCoicopSearchTerm: coicopUpdate,
        coicopEntries,
        loading,
        error,
    };
};
