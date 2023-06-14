import { fromDays, fromHours, fromMinutes, fromSeconds, fromYears } from '../time.utils';

describe('time.utils', () => {
  describe('fromSeconds', () => {
    it('should convert seconds to milliseconds', () => {
      expect(fromSeconds(1)).toBe(1000);
    });
  });

  describe('fromMinutes', () => {
    it('should convert seconds to milliseconds', () => {
      expect(fromMinutes(1)).toBe(60000);
    });
  });

  describe('fromHours', () => {
    it('should convert seconds to milliseconds', () => {
      expect(fromHours(1)).toBe(3600000);
    });
  });

  describe('fromDays', () => {
    it('should convert seconds to milliseconds', () => {
      expect(fromDays(1)).toBe(86400000);
    });
  });

  describe('fromYears', () => {
    it('should convert seconds to milliseconds', () => {
      expect(fromYears(1)).toBe(31536000000);
    });
  });
});
