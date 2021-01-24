import { parseDate } from '../utils/dateUtils';
import { day1, day2, day3 } from './purchases';

const expenses = [
  {
    "id": "C9lYYOxZOtu2ZYPWiTYT",
    "frequency": "MONTHLY",
    "name": "Bredbånd",
    "amount": "469.00",
    "registeredTime": parseDate(day1).toISOString(),
  },
  {
    "id": "UQEXWKECoaGWVylJBYh5",
    "name": "Strøm",
    "frequency": "QUARTERLY",
    "amount": "59.90",
    "registeredTime": parseDate(day2).toISOString(),
  },
  {
    "id": "Vh3FKCrwYbvgdKgnxwm0",
    "frequency": "YEARLY",
    "name": "dil og dal",
    "amount": "129.99",
    "registeredTime": parseDate(day3).toISOString(),
  }
];

export default expenses;
