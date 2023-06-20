import Empty from '../../components/Empty';
import Month from '../../components/Month/Month';
import WeekDayOfTheYear from '../../components/WeekDayOfTheYear';
import WeekOfTheYear from '../../components/WeekOfTheYear';
import { Category } from '../../constants/layout.constants';
import { layoutFactory } from '../layout.utils';

const CONFIG = {
  size: 5,
  gutter: [5, 5] as [number, number],
};

describe('layout.utils', () => {
  describe('month-day', () => {
    it('should return layout component months', () => {
      const [Component] = layoutFactory(new Date('2020-01-01'), Category.MONTH_DAY, CONFIG);

      expect(Component).toBe(Month);
    });

    it('should return 12 months', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.MONTH_DAY, CONFIG);

      expect(grid.data).toHaveLength(12);
    });

    it('should return calendar dimension', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.MONTH_DAY, CONFIG);

      expect(grid.width).toBe(725);
      expect(grid.height).toBe(65);
    });

    it('should return calendar dimension', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.MONTH_DAY, CONFIG);

      expect(grid.width).toBe(725);
      expect(grid.height).toBe(65);
    });

    it('should return correct time data', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.MONTH_DAY, CONFIG);

      expect(grid.data[0].year).toBe(2019);
      expect(grid.data[0].month).toBe(1);
      expect(grid.data[0].weeks).toBe(5);

      expect(grid.data[1].year).toBe(2019);
      expect(grid.data[1].month).toBe(2);
      expect(grid.data[1].weeks).toBe(5);

      expect(grid.data[11].year).toBe(2020);
      expect(grid.data[11].month).toBe(0);
      expect(grid.data[11].weeks).toBe(5);
    });

    it('should return correct svg coordinates', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.MONTH_DAY, CONFIG);

      expect(grid.data[0].x).toBe(0);
      expect(grid.data[0].y).toBe(0);

      expect(grid.data[1].x).toBe(60);
      expect(grid.data[1].y).toBe(0);

      expect(grid.data[11].x).toBe(680);
      expect(grid.data[11].y).toBe(0);
    });
  });

  describe('week-day', () => {
    it('should return layout component months', () => {
      const [Component] = layoutFactory(new Date('2020-01-01'), Category.WEEK_DAY, CONFIG);

      expect(Component).toBe(WeekDayOfTheYear);
    });

    it('should return 53 weeks', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.WEEK_DAY, CONFIG);

      expect(grid.data).toHaveLength(53);
    });

    it('should return calendar dimension', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.WEEK_DAY, CONFIG);

      expect(grid.width).toBe(525);
      expect(grid.height).toBe(65);
    });

    it('should return correct time data', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.WEEK_DAY, CONFIG);

      expect(grid.data[0].year).toBe(2019);
      expect(grid.data[0].month).toBe(0);
      expect(grid.data[0].week).toBe(1);

      expect(grid.data[1].year).toBe(2019);
      expect(grid.data[1].month).toBe(0);
      expect(grid.data[1].week).toBe(2);

      expect(grid.data[52].year).toBe(2019);
      expect(grid.data[52].month).toBe(0);
      expect(grid.data[52].week).toBe(53);
    });

    it('should return correct svg coordinates', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.WEEK_DAY, CONFIG);

      expect(grid.data[0].x).toBe(0);
      expect(grid.data[0].y).toBe(0);

      expect(grid.data[1].x).toBe(10);
      expect(grid.data[1].y).toBe(0);

      expect(grid.data[11].x).toBe(110);
      expect(grid.data[11].y).toBe(0);
    });
  });

  describe('week', () => {
    it('should return layout component months', () => {
      const [Component] = layoutFactory(new Date('2020-01-01'), Category.WEEK, CONFIG);

      expect(Component).toBe(WeekOfTheYear);
    });

    it('should return 53 weeks', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.WEEK, CONFIG);

      expect(grid.data).toHaveLength(53);
    });

    it('should return calendar dimension', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.WEEK, CONFIG);

      expect(grid.width).toBe(525);
      expect(grid.height).toBe(65);
    });

    it('should return correct time data', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.WEEK, CONFIG);

      expect(grid.data[0].year).toBe(2019);
      expect(grid.data[0].week).toBe(1);

      expect(grid.data[1].year).toBe(2019);
      expect(grid.data[1].week).toBe(2);

      expect(grid.data[52].year).toBe(2019);
      expect(grid.data[52].week).toBe(53);
    });

    it('should return correct svg coordinates', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), Category.WEEK, CONFIG);

      expect(grid.data[0].x).toBe(0);
      expect(grid.data[0].y).toBe(0);

      expect(grid.data[1].x).toBe(10);
      expect(grid.data[1].y).toBe(0);

      expect(grid.data[11].x).toBe(110);
      expect(grid.data[11].y).toBe(0);
    });
  });

  describe('unknown', () => {
    it('should return empty layout component', () => {
      const [Component] = layoutFactory(new Date('2020-01-01'), 'unknown' as any, CONFIG);

      expect(Component).toBe(Empty);
    });

    it('should return no data', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), 'unknown' as any, CONFIG);

      expect(grid.data).toHaveLength(0);
    });

    it('should return calendar dimension', () => {
      const [, grid] = layoutFactory(new Date('2020-01-01'), 'unknown' as any, CONFIG);

      expect(grid.width).toBe(0);
      expect(grid.height).toBe(0);
    });
  });
});
