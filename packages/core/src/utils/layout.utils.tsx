import { ComponentType } from 'react';
import { Category } from '../constants/layout.constants';
import { countWeeks, reshuffleMonths } from './months.utils';
import { DAYS_IN_WEEK } from '../constants/week.constants';
import Month from '../components/Month';
import WeekDayOfTheYear from '../components/WeekDayOfTheYear';
import { getMonthForWeek, getWeekNumber, getWeeksInYear } from './week.utils';
import { Grid, MonthDaysGrid, WeekDaysGrid, WeeksGrid } from '../types';
import WeekOfTheYear from '../components/WeekOfTheYear';

interface Config {
  size: number;
  gutter: [number, number];
}

function buildMonthsLayout(date: Date, { size, gutter }: Config): Grid<MonthDaysGrid> {
  const startMonth = date.getUTCMonth();
  const startYear = date.getUTCFullYear();

  const hSpace = 3 * gutter[0];
  const height = DAYS_IN_WEEK * size + (DAYS_IN_WEEK - 1) * gutter[1];

  let x = 0;

  const data = reshuffleMonths(startMonth).map((month) => {
    const year = startYear - (month > startMonth ? 1 : 0);
    const weeks = countWeeks(year, month);

    const width = weeks * size + (weeks - 1) * gutter[0];
    const res: MonthDaysGrid = {
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

function buildWeekDaysLayout(date: Date, { size, gutter }: Config): Grid<WeekDaysGrid> {
  const startYear = date.getUTCFullYear();
  const startWeek = getWeekNumber(startYear, date.getUTCMonth(), date.getUTCDate());

  const height = DAYS_IN_WEEK * size + (DAYS_IN_WEEK - 1) * gutter[1];

  const data: WeekDaysGrid[] = [];
  const weeksInYear = getWeeksInYear(date.getUTCFullYear());

  for (let i = 0; i < weeksInYear; i++) {
    let year = startYear;
    let week = i - weeksInYear + startWeek;

    if (startWeek + i <= weeksInYear) {
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

function buildWeeksLayout(date: Date, { size, gutter }: Config): Grid<WeeksGrid> {
  const startYear = date.getUTCFullYear();
  const startWeek = getWeekNumber(startYear, date.getUTCMonth(), date.getUTCDate());

  const data: WeeksGrid[] = [];
  const weeksInYear = getWeeksInYear(date.getUTCFullYear());
  const height = DAYS_IN_WEEK * size + (DAYS_IN_WEEK - 1) * gutter[1];

  for (let i = 0; i < weeksInYear; i++) {
    let year = startYear;
    let week = i - weeksInYear + startWeek;

    if (startWeek + i <= weeksInYear) {
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
    });
  }

  const last = data[data.length - 1];

  return {
    data,
    height,
    width: last.x + last.width,
  };
}

export function layoutFactory(startsAt: Date, category: Category, config: Config): [typeof Month, Grid<MonthDaysGrid>];
export function layoutFactory(
  startsAt: Date,
  category: Category,
  config: Config,
): [typeof WeekDayOfTheYear, Grid<WeekDaysGrid>];
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
  if (category === Category.MONTH_DAY) {
    return [Month, buildMonthsLayout(startsAt, config)];
  }

  if (category === Category.WEEK_DAY) {
    return [WeekDayOfTheYear, buildWeekDaysLayout(startsAt, config)];
  }

  if (category === Category.WEEK) {
    return [WeekOfTheYear, buildWeeksLayout(startsAt, config)];
  }

  return [() => null, { data: [], width: 0, height: 0 }];
}
