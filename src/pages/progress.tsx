import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import React, {useContext, useState} from 'react';
import {UserContext} from '../contexts';
import {useTranslation} from 'react-i18next';
import style from './styles/progress.module.scss'
import Modal from "../components/common/dialog/Modal";
import {useRouter} from "next/router";
import {PATHS} from "../uiConfig";
import {
    StatusConstants,
    UserStatusesKeys
} from "../firebase/model/User";
import {useStatusCheck} from "../hocs/useStatuses";


const Progress = () => {
    const {userInfo, isAuthenticated, updateUserStatus} = useContext(UserContext);
    const {isComplete : isSurveyComplete} = useStatusCheck(UserStatusesKeys.SURVEY_STATUS)
    const {isComplete : isJournalComplete, isStarted: isJournalStarted, isNotStarted: isJournalNotStarted} = useStatusCheck(UserStatusesKeys.JOURNAL_STATUS)
    const {isComplete : isQuestionnaireComplete, isStarted: isQuestionnaireStarted, isNotStarted: isQuestionnaireNotStarted} = useStatusCheck(UserStatusesKeys.QUESTIONNAIRE_STATUS)
    const [submitModalOpen, setSubmitModalOpen] = useState(false)
    const {t} = useTranslation('progress');
    const router = useRouter()

    console.log('userInfo', isAuthenticated, userInfo);
    return (
        <Workspace>
            <PageTitle title={t('title')} />
            <p>{t('intro')}</p>
            <p>{t('registerPeriod.period')}{`: ${userInfo.respondentDetails.diaryStart} - ${userInfo.respondentDetails.diaryEnd}`}</p>
            <div className={style.progress}>
                <div className={style.subSection}>
                    <div className={style.header}>
                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('recruitment.title')}</h3>
                            <div className={style.complete}>{t('recruitment.complete.boxText')}</div>
                        </div>
                    </div>
                </div>
                {isJournalComplete() &&
                <div className={style.subSection}>
                    <div className={style.header}>

                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('registerExpenses.title')}</h3>
                            <div className={style.complete}>{t('registerExpenses.complete.boxText')}</div>
                        </div>
                    </div>
                </div>

                }
                {isJournalStarted() &&
                    <div className={style.subSection}>
                        <div className={style.header}>
                            <div className={style.headerTitle}>
                                <h3 style={{margin: 0}} className={'ssb-title'}>{t('registerExpenses.title')}</h3>
                                <div className={style.started}>{t('registerExpenses.ongoing.boxText')}</div>
                            </div>
                        </div>
                    </div>

                }
                {isJournalNotStarted() &&
                <div className={style.subSection}>
                    <div className={style.header}>
                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('registerExpenses.title')}</h3>
                            <div className={style.notStarted}>{t('registerExpenses.notStarted.boxText')}</div>
                        </div>
                    </div>
                </div>

                }
                {isQuestionnaireComplete() &&
                    <div className={style.subSection}>
                        <div className={style.header}>
                            <div className={style.headerTitle}>
                                <h3 style={{margin: 0}} className={'ssb-title'}>{t('questionnaire.title')}</h3>
                                <div className={style.complete}>{t('questionnaire.complete.boxText')}</div>
                            </div>
                        </div>
                    </div>

                }
                {isQuestionnaireStarted() &&
                <div className={style.subSection}>
                    <div className={style.header}>
                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('questionnaire.title')}</h3>
                            <div className={style.started}>{t('questionnaire.onGoing.boxText')}</div>
                        </div>
                    </div>
                    <p className={style.innerText}>{t('questionnaire.onGoing.innerText')}</p>
                </div>

                }
                {isQuestionnaireNotStarted() &&
                <div className={style.subSection}>
                    <div style={{display: 'flex'}}>
                        <div className={style.headerTitle}>
                            <h3 style={{margin: 0}} className={'ssb-title'}>{t('questionnaire.title')}</h3>
                            <div className={style.notStarted}>{t('questionnaire.notStarted.boxText')}</div>
                        </div>
                    </div>
                    <p>{t('questionnaire.notStarted.innerText')}</p>
                </div>

                }
            </div>
            <div className={style.completion}>
                {!isSurveyComplete() &&
                    <div className={style.completeSurvey}>
                        <h3 className={style.title}>{t('completeSurvey.title')}</h3>
                        <div className={style.infoText}>
                        {isQuestionnaireComplete() &&
                            <p>{t('completeSurvey.finishedText')}</p>
                        }
                        {!isQuestionnaireComplete() &&
                            <p>{t('completeSurvey.notFinishedText')}</p>
                        }
                        </div>
                        <button
                            onClick={() => setSubmitModalOpen(true)}
                            className={`ssb-btn primary-btn ${style.action}`}
                            disabled={!isQuestionnaireComplete()}>
                            {t('completeSurvey.completeButtonText')}
                        </button>
                    </div>}
                    {isSurveyComplete() &&
                        <div className={style.completedSurvey}>
                            <h3>{t('completedSurvey.title')}</h3>
                            <p>{t('completedSurvey.text')}</p>
                        </div>
                    }
            </div>
            <Modal
                closeText={t('completeSurvey.modal.confirm')}
                cancelText={t('completeSurvey.modal.cancel')}
                show={submitModalOpen}
                onClose={() => {
                    updateUserStatus(UserStatusesKeys.JOURNAL_STATUS, StatusConstants.COMPLETE)
                        .then(() => {
                            updateUserStatus(UserStatusesKeys.SURVEY_STATUS, StatusConstants.COMPLETE)
                                .finally(() => {
                                    router.push(PATHS.HOME)
                                    setSubmitModalOpen(false)
                                })})
                }}
                onCancel={() => setSubmitModalOpen(false)}
                title={t('completeSurvey.modal.title')}>
                <p style={{textAlign : 'center'}}>{t('completeSurvey.modal.text')}</p>
            </Modal>
        </Workspace>
    );
};

export default Progress;