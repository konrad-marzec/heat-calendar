import { fromDays } from './time.utils';
import { DAYS_IN_WEEK } from '../constants/week.constants';

function startOfTheFirstWeekOfTheYear(year: number) {
  const date = new Date(Date.UTC(year, 0, 0));
  const day = date.getUTCDay() || DAYS_IN_WEEK;

  if (day >= 4) {
    return new Date(date.getTime() + fromDays(DAYS_IN_WEEK - day + 1));
  }

  return new Date(date.getTime() - fromDays(day - 1));
}

export function getWeeksInYear(year: number) {
  const start = startOfTheFirstWeekOfTheYear(year);
  const end = startOfTheFirstWeekOfTheYear(year + 1);

  return (end.getTime() - start.getTime()) / fromDays(7);
}

export function getWeekStartDay(year: number, month: number, week: number): number {
  if (month === -1) {
    const timestamp = startOfTheFirstWeekOfTheYear(year).getTime() + DAYS_IN_WEEK * week * fromDays(1);

    return new Date(timestamp).getUTCDate();
  }

  if (week === 1) {
    return 1;
  }

  return (week - 1) * DAYS_IN_WEEK - (new Date(Date.UTC(year, month, 1)).getUTCDay() || DAYS_IN_WEEK) + 2;
}

export function getWeekNumber(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month, day));

  const start = startOfTheFirstWeekOfTheYear(date.getUTCFullYear());
  const end = startOfTheFirstWeekOfTheYear(date.getUTCFullYear() + 1);

  const weekDay = date.getUTCDay() || DAYS_IN_WEEK;

  if (date.getUTCMonth() === 0 && date.getUTCDate() < DAYS_IN_WEEK) {
    if (date.getTime() < start.getTime()) {
      return (
        (startOfTheFirstWeekOfTheYear(date.getUTCFullYear()).getTime() -
          startOfTheFirstWeekOfTheYear(date.getUTCFullYear() - 1).getTime()) /
        fromDays(7)
      );
    }
  }

  if (end.getTime() <= date.getTime()) {
    if (weekDay < 4) {
      return 1;
    }

    return (end.getTime() - start.getTime()) / fromDays(7);
  }

  const startOfTheWeek = date.getTime() - fromDays(weekDay - 1);

  return (startOfTheWeek - start.getTime()) / fromDays(7) + 1;
}

export function getMonthForWeek(year: number, week: number) {
  const timestamp = startOfTheFirstWeekOfTheYear(year).getTime() + DAYS_IN_WEEK * week * fromDays(1);

  return new Date(timestamp).getUTCMonth();
}
