import { useContext, useEffect, useState } from 'react';
import { FireContext } from '../contexts';

const useSearchTerms = () => {
    const {firestore} = useContext(FireContext);
    const [searchTerms, setSearchTerms] = useState([]);

    useEffect(() => {
        console.log('Fetching search Terms');
        try {
            firestore
                .collection('/searchTerms')
                .onSnapshot(snapshot => {
                    console.log('Snapshot fetched for /searchTerms');
                    const searchTermRecords = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setSearchTerms(searchTermRecords);
                });
        } catch (err) {
            console.log('unable to fetch search terms', err);
        }
    }, []);

    const addSearchTerm = (searchTerm) => {
        console.log('adding new searchTerm', searchTerm);
        return firestore
            .collection('/searchTerms')
            .add(searchTerm);
    };

    const modifySearchTerm = (id, newContent) => {
        console.log(`updating search term ${id} with content ${JSON.stringify(newContent)}`);
        return firestore
            .collection('/searchTerms')
            .doc(`/${id}`)
            .update(newContent);
    };

    return { searchTerms, addSearchTerm, modifySearchTerm };
};

export default useSearchTerms;
