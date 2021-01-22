import { ReactNode, useState } from 'react';
import DayPicker, { Modifiers } from 'react-day-picker';
import { DAYS_FULL, DAYS_SHORT, MONTHS } from '../../utils/dateUtils';
import Accordion from '../common/blocks/accordion/Accordion';

import styles from './diary.module.scss';
import { useTranslation } from 'react-i18next';

export type DairyVizProps = {
    renderDay: (dt) => ReactNode;
    modifiers: Partial<Modifiers>;
    surveyStart: string,
    surveyEnd: string,
    initialMonth?: Date;
    firstDayOfWeek?: number;
    className?: string;
    titleComp?: ReactNode;
}

const DiaryViz = ({
                      renderDay,
                      modifiers,
                      initialMonth = new Date(),
                      firstDayOfWeek = 1,
                      className = '',
                      surveyStart,
                      surveyEnd,
                  }: DairyVizProps) => {
    const {t} = useTranslation('dashboard');
    const [diaryOpen, setDiaryOpen] = useState<boolean>();

    return (
        <Accordion
            className={styles.diary}
            open={diaryOpen}
            onClick={setDiaryOpen}
            title={
                <div className={styles.header}>
                    <span className={styles.surveyPeriodPrefix}>
                        {diaryOpen ? t('diary.openHeader') : t('diary.title')}
                    </span>
                    <span className={styles.surveyPeriod}>
                        {surveyStart} - {surveyEnd}
                    </span>
                </div>
            }
        >
            <div className={className}>
                <DayPicker
                    canChangeMonth={true}
                    renderDay={renderDay}
                    modifiers={modifiers}
                    initialMonth={initialMonth}
                    showOutsideDays={true}
                    months={MONTHS}
                    weekdaysLong={DAYS_FULL}
                    weekdaysShort={DAYS_SHORT}
                    firstDayOfWeek={firstDayOfWeek}
                />
            </div>
        </Accordion>
    );
};

export default DiaryViz;
