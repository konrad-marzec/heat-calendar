import { getMonthLastDay, countWeeks, reshuffleMonths } from '../months.utils';

describe('months.utils', () => {
  describe('getMonthLastDay', () => {
    it.each`
      year    | month | expected
      ${2012} | ${11} | ${31}
      ${1999} | ${0}  | ${31}
      ${2023} | ${1}  | ${28}
      ${2020} | ${1}  | ${29}
    `('should return last day of the month', ({ year, month, expected }) => {
      expect(getMonthLastDay(year, month)).toBe(expected);
    });
  });

  describe('countWeeks', () => {
    it.each`
      year    | month | expected
      ${2012} | ${11} | ${6}
      ${1999} | ${0}  | ${5}
      ${2023} | ${1}  | ${5}
      ${2020} | ${1}  | ${5}
      ${2013} | ${6}  | ${5}
    `('should return number of weeks within the month', ({ year, month, expected }) => {
      expect(countWeeks(year, month)).toBe(expected);
    });
  });

  describe('reshuffleMonths', () => {
    it.each`
      startsAt        | expected
      ${'1999-10-10'} | ${[10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      ${'2012-04-06'} | ${[4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3]}
      ${'2020-12-31'} | ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
      ${'2013-02-28'} | ${[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1]}
      ${'2023-01-01'} | ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0]}
    `('should place start month in the end', ({ startsAt, expected }) => {
      expect(reshuffleMonths(new Date(startsAt).getMonth())).toEqual(expected);
    });
  });
});
