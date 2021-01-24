import { add, sub } from 'date-fns';
import { parseDate, simpleFormat } from '../utils/dateUtils';
import { DUMMY_SURVEY_INFO } from '../firebase/UserProvider';

export const makeDay = (offset) =>
    simpleFormat(add(DUMMY_SURVEY_INFO.journalStart, {days: offset}));

export const day1 = makeDay(2);
export const day2 = makeDay(3);
export const day3 = makeDay(5);
export const day4 = makeDay(6);

const purchasesData = {
    [day1]: [
        {
            'id': 'bLpP5xKekFf4OMEa9M0f',
            'purchaseDate': parseDate(day1).toISOString(),
            'registeredTime': parseDate(day1).toISOString(),
            'amount': 19.9,
            'items': [
                {
                    'idx': 0,
                    'qty': '1',
                    'units': 'stk',
                    'name': 'Kaffe',
                    'amount': '19.90'
                }
            ],
            'name': 'kiosk',
            'purchaseDateRaw': '063742935600.000000000'
        }
    ],
    [day2]: [
        {
            'id': '9jBx2KXLx1zA4CuOeY4r',
            'purchaseDate': parseDate(day2).toISOString(),
            'registeredTime': parseDate(day2).toISOString(),
            'name': 'Kiosk',
            'amount': 120,
            'items': [
                {
                    'units': 'stk',
                    'name': 'Te',
                    'amount': '20.00',
                    'qty': '1',
                    'idx': 0
                }
            ],
            'purchaseDateRaw': '063743108400.000000000'
        },
        {
            'id': 'ERlHmtl7BC47FWPacmSo',
            'items': [
                {
                    'units': 'stk',
                    'name': 'salami',
                    'amoutn': '30.00',
                    'idx': 0,
                    'qty': '1',
                }
            ],
            'purchaseDate': parseDate(day2).toISOString(),
            'registeredTime': parseDate(day2).toISOString(),
            'name': 'kafé',
            'amount': 30,
            'purchaseDateRaw': '063743108400.000000000'
        }
    ],
    [day3]: [
        {
            'id': 'RJbUbnBxVJFHg5oMuPyW',
            'name': 'kiosk',
            'purchaseDate': parseDate(day3).toISOString(),
            'registeredTime': parseDate(day3).toISOString(),
            'amount': 70,
            'items': [
                {
                    'units': 'stk',
                    'name': 'Kaffe',
                    'qty': '1',
                    'amount': '30.00',
                    'idx': 0
                },
                {
                    'idx': 1,
                    'units': 'stk',
                    'name': 'Kake',
                    'amount': '40.00',
                    'qty': '1'
                }
            ],
            'purchaseDateRaw': '063743194800.000000000'
        }
    ],
    [day4]: [
        {
            'id': 'Luo000IrkW1IZjmM257U',
            'items': [
                {
                    'qty': '1',
                    'idx': 0,
                    'units': 'stk',
                    'name': 'cappucino',
                    'amount': '49.00'
                }
            ],
            'name': 'Baker Hansen',
            'purchaseDate': parseDate(day4).toISOString(),
            'registeredTime': parseDate(day4).toISOString(),
            'amount': 49,
            'purchaseDateRaw': '063743276389.307000000'
        },
        {
            'id': 'uc1TxYR53uVHsW8DriGU',
            'purchaseDate': parseDate(day4).toISOString(),
            'registeredTime': parseDate(day4).toISOString(),
            'items': [
                {
                    'qty': '1',
                    'name': 'salami',
                    'units': 'stk',
                    'idx': 0,
                    'amount': '99.00',
                }
            ],
            'name': 'Nytt kjøp',
            'amount': 99,
            'purchaseDateRaw': '063743275543.270000000'
        }
    ]
};

export default purchasesData;
