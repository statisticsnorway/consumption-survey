import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'react-feather';
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

const dateMonth = (dateStr) => {
    const date = notEmptyString(dateStr) ? new Date(dateStr) : new Date();
    const [dd, mm] = simpleFormat(date).split('.');
    return `${dd}.${mm}`;
};

const Home = () => {
    const {t} = useTranslation('home');
    const {userInfo: {respondentDetails}} = useContext(UserContext);

    const {name, diaryStart, diaryEnd} = respondentDetails;
    const subText = `${t('surveyInfo')} ${dateMonth(diaryStart)} - ${dateMonth(diaryEnd)}`;

    const [firstName,] = name.split(',');
    const greeting = `Hei ${capitalizeString(firstName)}`;

    return (
        <Workspace showFooter={true}>
            <PageTitle title={greeting} subText={subText}/>
            <HomeCTAButtonGroup>
                <HomeCTA text="Skann kvittering" iconComponent={<ScanReceiptIcon/>} onClick={() => {
                }}/>
                <HomeCTA text="Registrer kjøp manuelt" iconComponent={<AddPurchaseManualIcon/>} onClick={() => {
                }}/>
                <HomeCTA text="Legg inn regning" iconComponent={<AddRegularExpenseIcon/>} onClick={() => {
                }}/>
                <HomeCTA
                    text="Svar på spørreskjema"
                    styleClass={styles.questionnaireCTA}
                    onClick={() => {
                    }}
                    iconComponent={<ArrowRight width={28} height={28}/>}
                    iconPosition={IconPosition.AFTER}
                />
            </HomeCTAButtonGroup>
        </Workspace>
    );
};

export default Home;
