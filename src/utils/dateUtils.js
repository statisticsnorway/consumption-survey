import { format } from 'date-fns';

export const simpleFormat = (date) =>
    format(date, "dd.MM.YYYY")

export const dateFormatMonthDate = (date) =>
    format(date, "MMM-dd");
