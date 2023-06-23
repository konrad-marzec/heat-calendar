import { renderHook } from '@testing-library/react';

import { Category } from '../../constants/layout.constants';
import { useCategorizedData } from '../use-categorized-data';

const DATA: Array<[string, Record<string, number | string>]> = [
  ['2012-01-01', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-01-02', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-01-03', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-01-04', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-02-05', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-02-05', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-01-06', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-01-07', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-01-07', { key1: 1, key2: 2, key3: 'three' }],
  ['2012-01-07', { key1: 1, key2: 2, key3: 'three' }],
];

describe('category.utils', () => {
  describe('categories', () => {
    it('should aggregate elements by date', () => {
      const { result } = renderHook(() => useCategorizedData(DATA, 'key1', Category.MONTH_DAY));

      expect(result.current.size).toBe(7);
    });

    it('should aggregate elements by date', () => {
      const { result } = renderHook(() => useCategorizedData(DATA, 'key1', Category.WEEK_DAY));

      expect(result.current.size).toBe(7);
    });

    it('should aggregate elements by year and week', () => {
      const { result } = renderHook(() => useCategorizedData(DATA, 'key1', Category.WEEK));

      expect(result.current.size).toBe(3);
    });
  });

  describe('data key types', () => {
    describe('string dataKey', () => {
      it('should take correct value while aggregating data', () => {
        const { result } = renderHook(() => useCategorizedData(DATA, 'key1', Category.MONTH_DAY));

        expect(result.current.get('2012-01-07')).toBe(3);
        expect(result.current.get('2012-02-05')).toBe(2);
        expect(result.current.get('2012-01-04')).toBe(1);
        expect(result.current.get('2012-01-06')).toBe(1);
      });

      it('should take correct value while aggregating data', () => {
        const { result } = renderHook(() => useCategorizedData(DATA, 'key2', Category.MONTH_DAY));

        expect(result.current.get('2012-01-07')).toBe(6);
        expect(result.current.get('2012-02-05')).toBe(4);
        expect(result.current.get('2012-01-04')).toBe(2);
        expect(result.current.get('2012-01-06')).toBe(2);
      });

      it('should take correct value and count non numeric values while aggregating data', () => {
        const { result } = renderHook(() => useCategorizedData(DATA, 'key3', Category.MONTH_DAY));

        expect(result.current.get('2012-01-07')).toBe(3);
        expect(result.current.get('2012-02-05')).toBe(2);
        expect(result.current.get('2012-01-04')).toBe(1);
        expect(result.current.get('2012-01-06')).toBe(1);
      });
    });

    describe('function dataKey', () => {
      it('should take value returned by function while aggregating data', () => {
        const { result } = renderHook(() =>
          useCategorizedData(DATA, (val, item) => Math.max(val ?? 0, item.key1 as number), Category.MONTH_DAY),
        );

        expect(result.current.get('2012-01-07')).toBe(1);
        expect(result.current.get('2012-02-05')).toBe(1);
        expect(result.current.get('2012-01-04')).toBe(1);
        expect(result.current.get('2012-01-06')).toBe(1);
      });

      it('should take value returned by function while aggregating data', () => {
        const { result } = renderHook(() =>
          useCategorizedData(DATA, (val, item) => Math.max(val ?? 0, (item.key3 as string).length), Category.MONTH_DAY),
        );

        expect(result.current.get('2012-01-07')).toBe(5);
        expect(result.current.get('2012-01-06')).toBe(5);
      });
    });
  });
});
