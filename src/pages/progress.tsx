import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import {useContext, useEffect, useState} from 'react';
import {FireContext, UserContext} from '../contexts';
import { useTranslation } from 'react-i18next';
import Accordion from "../components/common/accordion/Accordion";
import {CheckCircle, Circle} from "react-feather";

const Progress = () => {
    const {userInfo, isAuthenticated} = useContext(UserContext);
    const [questionnaireStatus, setQuestionnaireStatus] = useState("NOT_STARTED")
    const { firestore} = useContext(FireContext)
    const {t} = useTranslation('progress');
    useEffect(() => {
        firestore
            .collection(`/users/${userInfo.userName}/questionnaire`)
            .doc('data')
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data()
                    setQuestionnaireStatus(data.status)
                }
            })
            .catch((err) => {
                console.log('cannot update answers', err)
            })
    }, [])
    console.log('userInfo', isAuthenticated, userInfo);
    return (
        <Workspace>
            <PageTitle title={t('title')} />
            <p>{t('intro')}</p>
            <Accordion title={t('registerPeriod.showRegisterPeriod')}>
                Kalender
            </Accordion>
            <div>
                <div>
                    <div style={{display: 'flex'}}>
                        <CheckCircle/>
                        <h3>{t('recruitment.title')}</h3>
                        <div>{t('recruitment.complete.boxText')}</div>
                    </div>
                    <p>{t('recruitment.complete.innerText')}</p>
                </div>
                <div>

                </div>

                {questionnaireStatus === 'COMPLETE' &&
                    <div>
                        <div>
                            <CheckCircle/>
                            <h3>{t('questionnaire.title')}</h3>
                            <div>{t('questionnaire.complete.boxText')}</div>
                        </div>
                    </div>

                }

            </div>
        </Workspace>
    );
};

export default Progress;
