import { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { FireContext, UserContext } from '../contexts';
import {
    getQuestionnairePathForUser,
    getStatusesPathForUser,
    INIT_QUESTIONNAIRE_DATA,
    StatusConstants
} from '../firebase/model/User';
import { hydrateQuestionnaire } from '../components/questionnaire/questions/UpdateQuestionValue';
import { CHANGE_ALL } from '../store/actionTypes';
import { getAnsweredValues } from '../components/questionnaire/questions/questionFunctionsUtils';
import { LogContext } from '../uiContexts';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';

const useQuestionnaire = () => {
    const store = useStore();
    const {firestore} = useContext(FireContext);
    const {isAuthenticated, respondentDetails} = useContext(UserContext);
    const [initialized, setInitialized] = useState<boolean>(false);
    const {logger} = useContext(LogContext);

    const [questionnaireRef, setQuestionnaireRef] = useState<DocumentReference>();

    useEffect(() => {
        if (firestore && isAuthenticated) {
            const questionRef = firestore.doc(getQuestionnairePathForUser(respondentDetails.respondentId));
            questionRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        if (data && data.answers) {
                            const currState = store.getState();
                            const hydrated = hydrateQuestionnaire(data.answers, currState.questions);
                            store.dispatch({
                                type: CHANGE_ALL,
                                questions: hydrated,
                                allHistory: data.history,
                                focus: data.currentFocus,
                            });
                        }
                    } else {
                        questionRef
                            .set(INIT_QUESTIONNAIRE_DATA, {merge: true});
                    }
                })
                .then(() => {
                    setQuestionnaireRef(questionRef);
                    setInitialized(true);
                })
                .catch(err => {
                    console.log('could not update answers', err);
                    logger.error(`Could not update answers %o`, err);
                });
        }
    }, [firestore, isAuthenticated]);

    useEffect(() => {
        if (initialized && questionnaireRef) {
            // subscribe to store events ie., whenever the redux store is
            // updated with answers, push the change to firestore
            store.subscribe(() => {
                const state = store.getState();
                const {questions, history, currentFocus} = state;
                const answers = getAnsweredValues(questions);

                questionnaireRef
                    .set({
                        status: StatusConstants.STARTED,        // <-- ToDo: remove this and use getStatusesForUser()
                        answers,
                        history,
                        currentFocus,
                    }, {merge: true});

                // ideally it should suffice setting status at one place
                // - including update at both places for the sake of backward compatibility
                firestore
                    .doc(getStatusesPathForUser(respondentDetails.respondentId))
                    .set({questionnaireStatus: StatusConstants.STARTED}, {merge: true});
            });
        }
    }, [initialized, questionnaireRef]);

    const updateStatus = async (status: StatusConstants) => {
        // ideally it should suffice setting status at one place
        // - including update at both places for the sake of backward compatibility
        const statusPromises = [
            questionnaireRef.set({status}, {merge: true}),
            firestore.doc(getStatusesPathForUser(respondentDetails.respondentId))
                .set({questionnaireStatus: status}, {merge: true}),
        ];

        return await Promise.all(statusPromises);
    }

    return {questionnaireRef, initialized, updateStatus};
};

export default useQuestionnaire;
