import { formatDate, formatWeek } from '../date.utils';

describe('date.utils', () => {
  describe('formatDate', () => {
    it.each`
      year    | month | day   | expected
      ${2020} | ${4}  | ${1}  | ${'2020-05-01'}
      ${2020} | ${11} | ${1}  | ${'2020-12-01'}
      ${2020} | ${11} | ${31} | ${'2020-12-31'}
      ${966}  | ${11} | ${31} | ${'966-12-31'}
    `('should return date in YYYY-MM-DD format', ({ year, month, day, expected }) => {
      expect(formatDate(year, month, day)).toBe(expected);
    });
  });

  describe('formatWeek', () => {
    it.each`
      year    | week  | expected
      ${2020} | ${4}  | ${'2020-04'}
      ${2020} | ${11} | ${'2020-11'}
      ${2020} | ${52} | ${'2020-52'}
      ${966}  | ${1}  | ${'966-01'}
    `('should return date in YYYY-weekNumber format', ({ year, week, expected }) => {
      expect(formatWeek(year, week)).toBe(expected);
    });
  });
});
