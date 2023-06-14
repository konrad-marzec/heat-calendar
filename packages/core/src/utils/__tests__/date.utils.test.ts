import { formatDate } from '../date.utils';

describe('date.utils', () => {
  describe('formatDate', () => {
    it.each`
      date                      | expected
      ${new Date(2020, 4, 1)}   | ${'2020-05-01'}
      ${new Date(2020, 11, 1)}  | ${'2020-12-01'}
      ${new Date(2020, 11, 31)} | ${'2020-12-31'}
      ${new Date(966, 11, 31)}  | ${'966-12-31'}
    `('should return date in YYYY-MM-DD format', ({ date, expected }) => {
      expect(formatDate(date)).toBe(expected);
    });
  });
});
