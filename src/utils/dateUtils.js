import { format, parse } from 'date-fns';

export const SIMPLE_DATE_FORMAT = "dd.MM.yyyy";
export const DASHBOARD_DATE_GROUPING_FORMAT = "dd.MMM.yyyy";

export const parseDate = (dateStr, fmt = SIMPLE_DATE_FORMAT, locale) => {
  return parse(dateStr, fmt, new Date(), { locale });
};

export const simpleFormat = (date, fmt = SIMPLE_DATE_FORMAT) =>
    format(date, fmt);

export const dateFormatMonthDate = (date, fmt = DASHBOARD_DATE_GROUPING_FORMAT) =>
    format(date, fmt);
