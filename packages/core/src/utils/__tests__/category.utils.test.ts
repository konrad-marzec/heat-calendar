import { getDay, getWeek } from '../category.utils';

describe('category.utils', () => {
  describe('getDay', () => {
    it.each`
      timestamp        | expected
      ${1588291200000} | ${'2020-05-01'}
      ${1606780800000} | ${'2020-12-01'}
      ${1687007974907} | ${'2023-06-17'}
    `('should return date in YYYY-MM-DD format', ({ timestamp, expected }) => {
      expect(getDay(timestamp)).toBe(expected);
    });
  });

  describe('getWeek', () => {
    it.each`
      timestamp        | expected
      ${1588291200000} | ${'2020-18'}
      ${1606780800000} | ${'2020-49'}
      ${1687007974907} | ${'2023-24'}
    `('should return date in YYYY-weekNumber format', ({ timestamp, expected }) => {
      expect(getWeek(timestamp)).toBe(expected);
    });
  });
});
