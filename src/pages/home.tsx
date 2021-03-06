import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ArrowRight} from 'react-feather';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import {UserContext} from '../contexts';
import {simpleFormat} from '../utils/dateUtils';
import {notEmptyString} from '../utils/jsUtils';
import ScanReceiptIcon from '../components/common/icons/custom/ScanReceiptIcon';
import AddPurchaseManualIcon from '../components/common/icons/custom/AddPurchaseManualIcon';
import AddRegularExpenseIcon from '../components/common/icons/custom/AddRegularExpenseIcon';
import {IconPosition} from '../components/common/icons/IconProps';
import HomeCTA from '../components/home/homeCTA/HomeCTA';
import HomeCTAButtonGroup from '../components/home/homeCTA/HomeCTAButtonGroup';

import styles from './styles/home.module.scss';
import {useRouter} from 'next/router';
import {PATHS} from '../uiConfig';
import useReceiptUpload from '../hocs/useReceiptUpload';
import RegularExpensesList from '../components/regularExpenses/RegularExpensesList';
import { UserStatusesKeys} from "../firebase/model/User";
import {useStatusCheck} from "../hocs/useStatuses";

const dateMonth = (dateStr) => {
    const date = notEmptyString(dateStr) ? new Date(dateStr) : new Date();
    const [dd, mm] = simpleFormat(date).split('.');
    return `${dd}.${mm}`;
};

const Home = () => {
    const router = useRouter();
    const {t} = useTranslation('home');
    const [showAddExpenseDialog, setShowAddExpensesDialog] = useState<boolean>(false);
    const {userInfo: {respondentDetails}, userStatuses} = useContext(UserContext);
    const {isComplete : isSurveyComplete} = useStatusCheck(UserStatusesKeys.SURVEY_STATUS)

    const {name, diaryStart, diaryEnd} = respondentDetails;
    const subText = `${t('surveyInfo')} ${dateMonth(diaryStart)} - ${dateMonth(diaryEnd)}`;

    const [firstName,] = name.split(',');
    // const greeting = `Hei ${capitalizeString(firstName)}`;
    const greeting = t('greeting');

    const onSuccessfulAdd = async (purchaseId) => {
        console.log('receipt uploaded, redirecting', purchaseId);
        await router.push(`${PATHS.CONSUMPTION}?highlight=${purchaseId}`);
    };

    const {hiddenUploadComponent, captureReceiptFromCameraOrLibrary} = useReceiptUpload(onSuccessfulAdd);

    console.log('hiddenComponent', hiddenUploadComponent);

    return (
        <Workspace showFooter={true}>
            {!isSurveyComplete() &&
            <><PageTitle title={greeting} subText={subText}/>
            <HomeCTAButtonGroup>
                <HomeCTA
                    text={t('registerNew.fromReceipt')}
                    iconComponent={<ScanReceiptIcon/>}
                    onClick={() => {
                        captureReceiptFromCameraOrLibrary();
                    }}
                />
                <HomeCTA
                    text={t('registerNew.manually')}
                    iconComponent={<AddPurchaseManualIcon/>}
                    onClick={() => {
                        router.push(PATHS.EDIT_PURCHASE);
                    }}
                />
                <HomeCTA
                    text={t('registerNew.regularExpense')}
                    iconComponent={<AddRegularExpenseIcon/>}
                    onClick={() => {
                        setShowAddExpensesDialog(true);
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
            <RegularExpensesList showExpensesList={false} showAddExpenseDialog={showAddExpenseDialog} />
          </>}
            {isSurveyComplete() &&
                <>
                    <PageTitle title={t('completed.title')}/>
                    <p>{t('completed.text')}</p>
                    <h2>{t('completed.contactInfo.title')}</h2>
                    <div>{t('completed.contactInfo.openingHours')}</div>
                    <div>{t('completed.contactInfo.phone')}</div>
                    <div>{t('completed.contactInfo.email')}</div>
                </>
            }
        </Workspace>
    );
};

export default Home;
