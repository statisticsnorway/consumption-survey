import { add, sub } from 'date-fns';
import { parseDate, simpleFormat } from '../utils/dateUtils';
import { DUMMY_SURVEY_INFO } from '../firebase/UserProvider';

const makeDay = (offset) =>
    simpleFormat(add(DUMMY_SURVEY_INFO.journalStart, { days: offset }));

const day1 = makeDay(2);
const day2 = makeDay(3);
const day3 = makeDay(6);
const day4 = makeDay(11);

const purchasesData = {
  [day1]: [
    {
      "id": "bLpP5xKekFf4OMEa9M0f",
      "when": parseDate(day1).toISOString(),
      "totalPrice": 19.9,
      "items": [
        {
          "idx": 0,
          "qty": "1",
          "units": "stk",
          "kr": "19",
          "cents": "90",
          "name": "Kaffe"
        }
      ],
      "where": "kiosk",
      "whenRaw": "063742935600.000000000"
    }
  ],
  [day2]: [
    {
      "id": "9jBx2KXLx1zA4CuOeY4r",
      "when": parseDate(day2).toISOString(),
      "where": "Kiosk",
      "totalPrice": 120,
      "items": [
        {
          "kr": "20",
          "units": "stk",
          "name": "Te",
          "cents": "00",
          "qty": "1",
          "idx": 0
        }
      ],
      "whenRaw": "063743108400.000000000"
    },
    {
      "id": "ERlHmtl7BC47FWPacmSo",
      "items": [
        {
          "units": "stk",
          "name": "salami",
          "kr": "30",
          "idx": 0,
          "qty": "1",
          "cents": "00"
        }
      ],
      "when": parseDate(day2).toISOString(),
      "where": "kafé",
      "totalPrice": 30,
      "whenRaw": "063743108400.000000000"
    }
  ],
  [day3]: [
    {
      "id": "RJbUbnBxVJFHg5oMuPyW",
      "where": "kiosk",
      "when": parseDate(day3).toISOString(),
      "totalPrice": 70,
      "items": [
        {
          "units": "stk",
          "kr": "30",
          "name": "Kaffe",
          "qty": "1",
          "cents": "00",
          "idx": 0
        },
        {
          "idx": 1,
          "units": "stk",
          "kr": "40",
          "name": "Kake",
          "cents": "00",
          "qty": "1"
        }
      ],
      "whenRaw": "063743194800.000000000"
    }
  ],
  [day4]: [
    {
      "id": "Luo000IrkW1IZjmM257U",
      "items": [
        {
          "qty": "1",
          "kr": "049",
          "idx": 0,
          "units": "stk",
          "name": "cappucino",
          "cents": "00"
        }
      ],
      "where": "Baker Hansen",
      "when": parseDate(day4).toISOString(),
      "totalPrice": 49,
      "whenRaw": "063743276389.307000000"
    },
    {
      "id": "uc1TxYR53uVHsW8DriGU",
      "when": parseDate(day4).toISOString(),
      "items": [
        {
          "cents": "00",
          "qty": "1",
          "name": "salami",
          "units": "stk",
          "idx": 0,
          "kr": "99"
        }
      ],
      "where": "Nytt kjøp",
      "totalPrice": 99,
      "whenRaw": "063743275543.270000000"
    }
  ]
};

export default purchasesData;
