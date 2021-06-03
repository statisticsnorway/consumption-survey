import { format, parse, compareDesc } from 'date-fns';
import nbLocale from 'date-fns/locale/nb'
import { IDENTITY_FN } from './jsUtils';

export const MONTHS = [
    'Januar',
    'Februar',
    'Mars',
    'April',
    'May',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Desember'
];

export const DAYS_FULL = [
    'Søndag',
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
];

export const DAYS_SHORT = [
    'S',
    'M',
    'T',
    'O',
    'T',
    'F',
    'L',
];

export const SIMPLE_DATE_FORMAT = 'dd.MM.yyyy';
export const DASHBOARD_DATE_GROUPING_FORMAT = 'dd.MMM';
export const DASHBOARD_DAY_DATE_FORMAT = 'dd.eee.yyyy';
export const OCR_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const parseDate = (dateStr, fmt = SIMPLE_DATE_FORMAT, locale) => {
    return parse(dateStr, fmt, new Date(), {locale});
};

const handleUnknownDateType = (date) => {
    throw new Error(`Do not know how to parse ${typeof date}/(value: ${date}) for Date-processing`);
};

export const sanitizeDate = (date) => {
    switch (typeof date) {
        case 'string':
            return Date.parse(date);
        case 'number':
        case Date:
            return date;
        case 'object':
            if (typeof date.getMonth === 'function') {
                return date;
            } else {
                handleUnknownDateType(date);
            }
        default:
            handleUnknownDateType(date);
    }
};

export const formatDate = (date, fmt) =>
    format(date, fmt, {locale: nbLocale});

export const simpleFormat = (date, fmt = SIMPLE_DATE_FORMAT) => {
    console.log('trying to format', date, typeof date);
    if (!date) {
        return null;
    }
    return formatDate(sanitizeDate(date), fmt);
}

export const dateFormatDateMonth = (date, fmt = DASHBOARD_DATE_GROUPING_FORMAT) =>
    formatDate(date, fmt);

export const dateFormatDayDate = (date, fmt = DASHBOARD_DAY_DATE_FORMAT) =>
    formatDate(date, fmt);

export const DateSortOrder = {
    ASC: 'ascending',
    DESC: 'descending'
};

export const dateComparator = (sortOrder = DateSortOrder.DESC, extractor = IDENTITY_FN, fmt = SIMPLE_DATE_FORMAT) => (dt1, dt2) => {
    const cmp1 = sortOrder === DateSortOrder.DESC ? extractor(dt1) : extractor(dt2);
    const cmp2 = sortOrder === DateSortOrder.DESC ? extractor(dt2) : extractor(dt1);
    return compareDesc(parseDate(cmp1, fmt), parseDate(cmp2, fmt));
};
