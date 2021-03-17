import { useContext, useEffect, useState } from 'react';
import { FireContext, SearchTermsContext } from '../contexts';
import { SearchTermType } from '../firebase/model/SearchTerm';

export type AddSearchTermFn = (SearchTermType) => void;
export type ModifySearchTermFn = (id, SearchTermType) => void;

export type SearchTermsHookData = {
    searchTerms: SearchTermType[];
    addSearchTerm?: AddSearchTermFn;
    modifySearchTerm?: ModifySearchTermFn;
    searchTermsErrors: any;
};

/** This hook is redundant ? */
const useSearchTerms = (): SearchTermsHookData => {
    const {searchTerms, searchTermsErrors} = useContext(SearchTermsContext);

    return {
        searchTerms,
        searchTermsErrors,
    };
};

export default useSearchTerms;
