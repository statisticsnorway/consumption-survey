import React, { useContext } from 'react'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { ConsumptionForm } from '../components/questionnaire/ConsumptionForm'
import useQuestionnaire from '../hocs/useQuestionnaire';
import { LayoutContext } from '../uiContexts';
import { PATHS } from '../uiConfig';
import { StatusConstants } from '../firebase/model/User';
import { MessagePanelType } from '../components/common/blocks/MessagePanel';
import Loader from '../components/common/Loader';
import OpLayout from '../components/layout/OpLayout';

const Questionnaire = () => {
    const router = useRouter();
    const {t} = useTranslation('questionnaire');
    const {initialized, updateStatus} = useQuestionnaire();
    const {showMessagePanel} = useContext(LayoutContext);

    const onCompletionSuccess = () => {
        showMessagePanel(
            MessagePanelType.SUCCESS,
            t('completionSuccess'),
            true,
            () => {
                router.push(PATHS.HOME);
            }
        )
    };

    const onCompletionError = (err) => {
        showMessagePanel(
            MessagePanelType.ERROR,
            `${t('completionFailure')}: ${JSON.stringify(err)}`,
        );
    };

    return initialized ? (
        <ConsumptionForm
            onFinished={() => {
                updateStatus(StatusConstants.COMPLETE)
                    .then(onCompletionSuccess)
                    .catch(onCompletionError);
            }}
        />
    ) : <Loader />;
};

Questionnaire.getLayout = (children) =>
    <OpLayout showAppHeader={false}>{children}</OpLayout>;

export default Questionnaire;
