import { useContext, useEffect, useState } from 'react';
import { FireContext, QuestionnaireContext, UserContext } from '../contexts';
import {
    getQuestionnairePathForUser,
    INIT_QUESTIONNAIRE_DATA,
    StatusConstants,
    UserStatusesKeys
} from '../firebase/model/User';
import {hydrateQuestionnaire} from '../components/questionnaire/questions/UpdateQuestionValue';
import {CHANGE_ALL} from '../store/actionTypes';
import {getAnsweredValues} from '../components/questionnaire/questions/questionFunctionsUtils';
import {LogContext} from '../uiContexts';
import {DocumentReference} from '@firebase/firestore-types';

const useQuestionnaire = () => {
    const {firestore} = useContext(FireContext);
    const {isAuthenticated, respondentDetails, updateUserStatus} = useContext(UserContext);
    const {store, initialized, setInitialized} = useContext(QuestionnaireContext);
    const {logger} = useContext(LogContext);

    const [questionnaireRef, setQuestionnaireRef] = useState<DocumentReference>();

    useEffect(() => {
        if (firestore && isAuthenticated && !initialized) {
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
    }, [firestore, isAuthenticated, initialized]);

    useEffect(() => {
        if (initialized && questionnaireRef) {
            // subscribe to store events ie., whenever the redux store is
            // updated with answers, push the change to firestore

            store.subscribe(() => {
                const state = store.getState();
                const {questions, history, currentFocus} = state;
                const answers = getAnsweredValues(questions);

                console.log('**** new answers', answers);
                questionnaireRef
                    .set({
                        status: StatusConstants.STARTED,        // <-- ToDo: remove this and use getStatusesForUser()
                        answers,
                        history,
                        currentFocus,
                    }, {merge: true});

                // ideally it should suffice setting status at one place
                // - including update at both places for the sake of backward compatibility
                updateUserStatus(UserStatusesKeys.QUESTIONNAIRE_STATUS, StatusConstants.STARTED)
            });
        }
    }, [initialized, questionnaireRef]);

    const updateStatus = async (status: StatusConstants) =>
        updateUserStatus(UserStatusesKeys.QUESTIONNAIRE_STATUS, status);


    return {questionnaireRef, initialized, updateStatus};
};

export default useQuestionnaire;
