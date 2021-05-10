import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Workspace from '../components/layout/workspace/Workspace';
import PageTitle from '../components/common/PageTitle';
import { UserContext } from '../contexts';
import { simpleFormat } from '../utils/dateUtils';
import { notEmptyString, capitalizeString } from '../utils/jsUtils';

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
        </Workspace>
    );
};

export default Home;
