import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'react-feather';
import uuid from 'uuid';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import { UserContext } from '../contexts';
import { simpleFormat } from '../utils/dateUtils';
import { capitalizeString, notEmptyString } from '../utils/jsUtils';
import ScanReceiptIcon from '../components/common/icons/custom/ScanReceiptIcon';
import AddPurchaseManualIcon from '../components/common/icons/custom/AddPurchaseManualIcon';
import AddRegularExpenseIcon from '../components/common/icons/custom/AddRegularExpenseIcon';
import { IconPosition } from '../components/common/icons/IconProps';
import HomeCTA from '../components/home/homeCTA/HomeCTA';
import HomeCTAButtonGroup from '../components/home/homeCTA/HomeCTAButtonGroup';

import styles from './styles/home.module.scss';
import { useRouter } from 'next/router';
import { ADD_PURCHASE_MODES, addPurchasePath, PATHS } from '../uiConfig';
import useReceiptUpload from '../hocs/useReceiptUpload';

const dateMonth = (dateStr) => {
    const date = notEmptyString(dateStr) ? new Date(dateStr) : new Date();
    const [dd, mm] = simpleFormat(date).split('.');
    return `${dd}.${mm}`;
};

const Home = () => {
    const router = useRouter();
    const {t} = useTranslation('home');
    const {userInfo: {respondentDetails}} = useContext(UserContext);

    const {name, diaryStart, diaryEnd} = respondentDetails;
    const subText = `${t('surveyInfo')} ${dateMonth(diaryStart)} - ${dateMonth(diaryEnd)}`;

    const [firstName,] = name.split(',');
    const greeting = `Hei ${capitalizeString(firstName)}`;

    const onSuccessfulAdd = async (purchaseId) => {
        console.log('receipt uploaded, redirecting', purchaseId);
        await router.push(`${PATHS.CONSUMPTION}?highlight=${purchaseId}`);
    };

    const {hiddenUploadComponent, openFileDialog} = useReceiptUpload(onSuccessfulAdd);

    console.log('hiddenComponent', hiddenUploadComponent);

    return (
        <Workspace showFooter={true}>
            <PageTitle title={greeting} subText={subText}/>
            <HomeCTAButtonGroup>
                <HomeCTA
                    text={t('registerNew.fromReceipt')}
                    iconComponent={<ScanReceiptIcon/>}
                    onClick={() => {
                        openFileDialog();
                    }}
                />
                <HomeCTA
                    text={t('registerNew.manually')}
                    iconComponent={<AddPurchaseManualIcon/>}
                    onClick={() => {
                        router.push(addPurchasePath(ADD_PURCHASE_MODES.MANUAL));
                    }}
                />
                <HomeCTA
                    text={t('registerNew.regularExpense')}
                    iconComponent={<AddRegularExpenseIcon/>}
                    onClick={() => {
                        router.push(PATHS.ADD_REGULAR_EXPENSE);
                    }}
                />
                <HomeCTA
                    text={t('questionnaire.title')}
                    styleClass={styles.questionnaireCTA}
                    onClick={() => {
                        router.push(PATHS.QUESTIONNAIRE);
                    }}
                    iconComponent={<ArrowRight width={28} height={28}/>}
                    iconPosition={IconPosition.AFTER}
                />
            </HomeCTAButtonGroup>
            {hiddenUploadComponent}
        </Workspace>
    );
};

export default Home;
