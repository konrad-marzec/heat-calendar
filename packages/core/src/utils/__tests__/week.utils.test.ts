import { getMonthForWeek, getWeekNumber, getWeekStartDay, getWeeksInYear } from '../week.utils';

describe('week.utils', () => {
  describe('getMonthForWeek', () => {
    it.each`
      year    | week  | expected
      ${2020} | ${1}  | ${0}
      ${2020} | ${0}  | ${11}
      ${2023} | ${52} | ${0}
      ${2023} | ${51} | ${11}
      ${1999} | ${10} | ${2}
      ${1869} | ${40} | ${9}
    `('should return last day of the month', ({ year, week, expected }) => {
      expect(getMonthForWeek(year, week)).toBe(expected);
    });
  });

  describe('getWeekNumber', () => {
    it.each`
      year    | month | day   | expected
      ${1999} | ${9}  | ${11} | ${40}
      ${2012} | ${3}  | ${7}  | ${14}
      ${2023} | ${0}  | ${2}  | ${52}
      ${2013} | ${1}  | ${29} | ${9}
      ${2019} | ${0}  | ${2}  | ${1}
      ${2019} | ${0}  | ${7}  | ${1}
      ${2019} | ${11} | ${24} | ${52}
      ${2019} | ${11} | ${32} | ${1}
      ${2020} | ${0}  | ${2}  | ${1}
      ${2020} | ${0}  | ${6}  | ${1}
      ${2020} | ${0}  | ${7}  | ${2}
      ${2020} | ${5}  | ${7}  | ${23}
      ${2020} | ${0}  | ${14} | ${3}
      ${2020} | ${1}  | ${30} | ${9}
      ${2020} | ${11} | ${32} | ${53}
      ${2020} | ${11} | ${29} | ${53}
      ${2080} | ${11} | ${29} | ${52}
    `('should return number of weeks within the month', ({ year, month, day, expected }) => {
      expect(getWeekNumber(year, month, day)).toBe(expected);
    });
  });

  describe('getWeeksInYear', () => {
    it.each`
      year    | expected
      ${1999} | ${52}
      ${2013} | ${52}
      ${2012} | ${52}
      ${2019} | ${52}
      ${2020} | ${53}
      ${2023} | ${52}
      ${2026} | ${53}
      ${2070} | ${52}
    `('should return number of weeks within the month', ({ year, expected }) => {
      expect(getWeeksInYear(year)).toBe(expected);
    });
  });

  describe('getWeekStartDay', () => {
    it.each`
      year    | month | week | expected
      ${1999} | ${9}  | ${1} | ${1}
      ${2012} | ${3}  | ${4} | ${16}
      ${2013} | ${1}  | ${4} | ${18}
      ${2019} | ${0}  | ${2} | ${7}
      ${2019} | ${0}  | ${3} | ${14}
      ${2019} | ${11} | ${1} | ${1}
      ${2019} | ${11} | ${6} | ${30}
    `('should place start month in the end', ({ year, month, week, expected }) => {
      expect(getWeekStartDay(year, month, week)).toEqual(expected);
    });
  });
});