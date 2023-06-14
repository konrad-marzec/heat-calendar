import { DAYS_IN_WEEK } from '../constants/week.constants';
import { fromDays } from './time.utils';

function startOfTheFirstWeekOfTheYear(year: number) {
  const date = new Date(year, 0, 1);
  const day = date.getDay();

  return new Date(year, 0, 1 - ((day ?? DAYS_IN_WEEK) - 1));
}

export function getWeekStartDay(year: number, month: number, week: number): number {
  if (month === -1) {
    const timestamp = startOfTheFirstWeekOfTheYear(year).getTime() + DAYS_IN_WEEK * week * fromDays(1);

    return new Date(timestamp).getDate();
  }

  if (week === 1) {
    return 1;
  }

  return (week - 1) * DAYS_IN_WEEK - (new Date(year, month, 1).getDay() || DAYS_IN_WEEK) + 2;
}

export function getWeekNumber(date: Date) {
  const year = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - year.getTime()) / fromDays(1));

  return Math.ceil((date.getDay() + 1 + days) / 7);
}

export function getMonthForWeek(year: number, week: number) {
  const timestamp = startOfTheFirstWeekOfTheYear(year).getTime() + DAYS_IN_WEEK * week * fromDays(1);

  return new Date(timestamp).getMonth();
}
