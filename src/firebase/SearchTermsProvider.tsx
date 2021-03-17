import { useContext, useEffect, useState } from 'react';
import { FireContext, SearchTermsContext, UserContext } from '../contexts';
import { SearchTermType } from './model/SearchTerm';

const SearchTermsProvider = ({children}) => {
    const {isAuthenticated} = useContext(UserContext);
    const {rtdb} = useContext(FireContext);
    const [searchTerms, setSearchTerms] = useState<SearchTermType[]>([]);
    const [searchTermsErrors, setSearchTermsErrors] = useState<any>(null);
    const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

    useEffect(() => {
        // possible race condition between rtdb, auth and fb ?!
        if (isAuthenticated && rtdb) {
            try {
                console.log('fetching 1st cut searchTerms list ...');
                rtdb.ref()
                    .once('value', (snap) => {
                        console.log(`Found ${snap.numChildren()} children`);
                        snap.forEach(childSnap => {
                            searchTerms.push(childSnap.val());
                        });

                        setInitialLoadComplete(true);
                    })
                    .catch((err) => {
                        setSearchTermsErrors(err);
                    });

                console.log('setting up child event listeners');
                rtdb.ref()
                    .on('child_added', (snap) => {
                        if (initialLoadComplete) {
                            const term = snap.val();
                            console.log('received new term', term);
                            addSearchTerm(term);
                        }
                    });

                rtdb.ref()
                    .on('child_removed', (snap) => {
                        if (initialLoadComplete) {
                            const term = snap.val();
                            console.log('removed term', term);
                            removeSearchTerm(term);
                        }
                    });

                rtdb.ref()
                    .on('child_changed', (snap) => {
                        if (initialLoadComplete) {
                            const term = snap.val();
                            console.log('modified term', term);
                            modifySearchTerm(term);
                        }
                    })
            } catch (err) {
                console.log('error setting up rtdb', err);
                setSearchTermsErrors(err);
            }
        } else {
            console.log('rtdb not ready yet');
        }
    }, [isAuthenticated, rtdb]);

    const addSearchTerm = (added: SearchTermType) => {
        searchTerms.push(added);
    };

    const removeSearchTerm = (removed: SearchTermType) => {
        setSearchTerms(searchTerms
            .filter(term => term.id !== removed.id));
    };

    const modifySearchTerm = (modified: SearchTermType) => {
        setSearchTerms([
            ...(searchTerms.filter(term => term.id !== modified.id)),
            modified,
        ]);
    };

    return (
        <SearchTermsContext.Provider value={{
            searchTerms, setSearchTerms,
            initialLoadComplete, setInitialLoadComplete,
            searchTermsErrors,
        }}>
            {children}
        </SearchTermsContext.Provider>
    );
};

export default SearchTermsProvider;
