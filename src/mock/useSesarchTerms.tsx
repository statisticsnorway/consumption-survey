import { useEffect, useState } from 'react';
import { SearchTermType } from '../firebase/model/SearchTerm';

export type AddSearchTermFn = (SearchTermType) => void;
export type ModifySearchTermFn = (id, SearchTermType) => void;

export type SearchTermsHookData = {
    searchTerms: SearchTermType[];
    addSearchTerm: AddSearchTermFn;
    modifySearchTerm: ModifySearchTermFn;
};

import SEARCH_TERMS_MOCK from './searchTerms.json';

const useSearchTerms = (): SearchTermsHookData => {
    const [searchTerms, setSearchTerms] = useState<SearchTermType[]>([]);

    useEffect(() => {
        console.log('Fetching search Terms');
        setSearchTerms(SEARCH_TERMS_MOCK);
    }, []);

    const addSearchTerm = (searchTerm) => {
        console.log('adding new searchTerm', searchTerm);
        setSearchTerms([
            ...searchTerms,
            searchTerm,
        ]);

        return Promise.resolve();
    };

    const modifySearchTerm = (id, newContent) => {
        console.log(`updating search term ${id} with content ${JSON.stringify(newContent)}`);
        const others = searchTerms.filter(term => term.id !== id);
        setSearchTerms([
            ...others,
            newContent,
        ]);

        return Promise.resolve();
    };

    return { searchTerms, addSearchTerm, modifySearchTerm };
};

export default useSearchTerms;
