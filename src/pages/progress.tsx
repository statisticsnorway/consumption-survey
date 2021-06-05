import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import React, {useContext, useEffect, useState} from 'react';
import {FireContext, UserContext} from '../contexts';
import { useTranslation } from 'react-i18next';
import Accordion from "../components/common/accordion/Accordion";
import {CheckCircle, Circle} from "react-feather";
import usePurchases from "../hocs/usePurchases";
import style from './styles/progress.module.scss'
import Modal from "../components/common/dialog/Modal";
import {useRouter} from "next/router";
import {PATHS} from "../uiConfig";


const Progress = () => {
    const {userInfo, isAuthenticated} = useContext(UserContext);
    const [questionnaireStatus, setQuestionnaireStatus] = useState("NOT_STARTED")
    const { firestore} = useContext(FireContext)
    const [submitModalOpen, setSubmitModalOpen] = useState(false)
    const {t} = useTranslation('progress');
    const {purchases} = usePurchases()
    const router = useRouter()

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
            <div className={style.progress}>
                <div className={style.subSection}>
                    <div className={style.header}>
                        <CheckCircle size={22}
                                     color={"green"}/>
                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('recruitment.title')}</h3>
                            <div className={style.complete}>{t('recruitment.complete.boxText')}</div>
                        </div>
                    </div>
                    <p>{t('recruitment.complete.innerText')}</p>
                </div>
                <hr/>
                {purchases && purchases.length > 0 &&
                    <div className={style.subSection}>
                        <div className={style.header}>
                            <Circle/>
                            <div className={style.headerTitle}>
                                <h3 style={{margin: 0}} className={'ssb-title'}>{t('registerExpenses.title')}</h3>
                                <div className={style.started}>{t('registerExpenses.ongoing.boxText')}</div>
                            </div>
                        </div>
                        <p>{t('registerExpenses.notStarted.innerTextPre')}{userInfo.respondentDetails.diaryStart}{' - '}{userInfo.respondentDetails.diaryEnd}{t('registerExpenses.notStarted.innerTextPost')}</p>
                    </div>

                }
                {(!purchases || purchases.length < 1) &&
                <div className={style.subSection}>
                    <div className={style.header}>
                        <Circle/>
                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('registerExpenses.title')}</h3>
                            <div className={style.notStarted}>{t('registerExpenses.notStarted.boxText')}</div>
                        </div>
                    </div>
                    <p>{t('registerExpenses.notStarted.innerTextPre')}{userInfo.respondentDetails.diaryStart}{' - '}{userInfo.respondentDetails.diaryEnd}{t('registerExpenses.notStarted.innerTextPost')}</p>
                </div>

                }
                <hr/>
                {questionnaireStatus === 'COMPLETE' &&
                    <div className={style.subSection}>
                        <div className={style.header}>
                            <CheckCircle size={22}
                                         color={"green"}/>
                            <div className={style.headerTitle}>
                                <h3 style={{margin: 0}} className={'ssb-title'}>{t('questionnaire.title')}</h3>
                                <div className={style.complete}>{t('questionnaire.complete.boxText')}</div>
                            </div>
                        </div>
                        <p>{t('questionnaire.complete.innerText')}</p>
                    </div>

                }
                {questionnaireStatus === 'STARTED' &&
                <div className={style.subSection}>
                    <div className={style.header}>
                        <Circle/>
                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('questionnaire.title')}</h3>
                            <div className={style.started}>{t('questionnaire.onGoing.boxText')}</div>
                        </div>
                    </div>
                    <p>{t('questionnaire.onGoing.innerText')}</p>
                </div>

                }
                {questionnaireStatus === 'NOT_STARTED' &&
                <div className={style.subSection}>
                    <div style={{display: 'flex'}}>
                        <Circle/>
                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('questionnaire.title')}</h3>
                            <div className={style.notStarted}>{t('questionnaire.notStarted.boxText')}</div>
                        </div>
                    </div>
                    <p>{t('questionnaire.notStarted.innerText')}</p>
                </div>

                }
                <hr/>
                <div className={style.completeSurvey}>
                    <h3>{t('completeSurvey.title')}</h3>
                    {questionnaireStatus === 'COMPLETE' &&
                        <p>{t('completeSurvey.finishedText')}</p>
                    }
                    {questionnaireStatus !== 'COMPLETE' &&
                    <p>{t('completeSurvey.notFinishedText')}</p>
                    }
                    <hr/>
                    <button
                        onClick={() => setSubmitModalOpen(true)}
                        style={{width: '100%'}} className={`ssb-btn primary-btn`} disabled={questionnaireStatus !== 'COMPLETE'}>
                        {t('completeSurvey.completeButtonText')}
                    </button>
                </div>
            </div>
            <Modal
                closeText={t('completeSurvey.modal.confirm')}
                cancelText={t('completeSurvey.modal.cancel')}
                show={submitModalOpen}
                onClose={() => {
                    firestore.doc(`/users/${userInfo.userName}`).
                        set({diaryStatus : 'COMPLETE'}, {merge: true})
                    setSubmitModalOpen(false)
                    router.push(PATHS.HOME)
                }}
                onCancel={() => setSubmitModalOpen(false)}
                title={t('completeSurvey.modal.title')}>
                <p style={{textAlign : 'center'}}>{t('completeSurvey.modal.text')}</p>
            </Modal>
        </Workspace>
    );
};

export default Progress;
