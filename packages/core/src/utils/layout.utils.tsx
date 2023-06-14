import { ComponentType } from 'react';
import { Category } from '../constants/layout.constants';
import { countWeeks, reshuffleMonths } from './months.utils';
import { DAYS_IN_WEEK, WEEKS_IN_YEAR } from '../constants/week.constants';
import Month from '../components/Month';
import WeekOfTheYear from '../components/Month/WeekOfTheYear';
import { getMonthForWeek, getWeekNumber } from './week.utils';
import { Grid, MonthsGrid, WeeksGrid } from '../types';

interface Config {
  size: number;
  gutter: [number, number];
}

function buildMonthsLayout(date: Date, { size, gutter }: Config): Grid<MonthsGrid> {
  const startMonth = date.getMonth();
  const startYear = date.getFullYear();

  const hSpace = 3 * gutter[0];
  const height = DAYS_IN_WEEK * size + (DAYS_IN_WEEK - 1) * gutter[1];

  let x = 0;

  const data = reshuffleMonths(startMonth).map((month) => {
    const year = startYear - (month > startMonth ? 1 : 0);
    const weeks = countWeeks(year, month);

    const width = weeks * size + (weeks - 1) * gutter[0];
    const res: MonthsGrid = {
      x,
      y: 0,
      year,
      month,
      weeks,
      width,
      height,
      key: month,
    };

    x += width + hSpace;

    return res;
  });

  const last = data[data.length - 1];

  return {
    data,
    height,
    width: last.x + last.width,
  };
}

function buildWeeksLayout(date: Date, { size, gutter }: Config): Grid<WeeksGrid> {
  const startYear = date.getFullYear();
  const startWeek = (getWeekNumber(date) + 1) % WEEKS_IN_YEAR;

  const height = DAYS_IN_WEEK * size + (DAYS_IN_WEEK - 1) * gutter[1];

  const data: WeeksGrid[] = [];

  for (let i = 0; i < WEEKS_IN_YEAR; i++) {
    let year = startYear;
    let week = i - WEEKS_IN_YEAR + startWeek;

    if (startWeek + i <= WEEKS_IN_YEAR) {
      year = startYear - 1;
      week = startWeek + i;
    }

    data.push({
      y: 0,
      year,
      week,
      height,
      key: i,
      width: size,
      x: i * (size + gutter[0]),
      month: getMonthForWeek(year, week),
    });
  }

  const last = data[data.length - 1];

  return {
    data,
    height,
    width: last.x + last.width,
  };
}

export function layoutFactory(startsAt: Date, category: Category, config: Config): [typeof Month, Grid<MonthsGrid>];
export function layoutFactory(
  startsAt: Date,
  category: Category,
  config: Config,
): [typeof WeekOfTheYear, Grid<WeeksGrid>];
export function layoutFactory<T extends Category>(
  startsAt: Date,
  category: T,
  config: Config,
): [ComponentType<any>, Grid<any>] {
  if (category === Category.MONTH) {
    return [Month, buildMonthsLayout(startsAt, config)];
  }

  if (category === Category.WEEK) {
    return [WeekOfTheYear, buildWeeksLayout(startsAt, config)];
  }

  return [() => null, { data: [], width: 0, height: 0 }];
}
