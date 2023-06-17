import { DAYS_IN_WEEK } from '../constants/week.constants';
import { fromDays } from './time.utils';

function startOfTheFirstWeekOfTheYear(year: number) {
  const date = new Date(year, 0, 1);
  date.setUTCHours(0, 0, 0, 0);

  const day = date.getDay() || DAYS_IN_WEEK;

  if (day >= 4) {
    const start = new Date(date.getTime() + fromDays(DAYS_IN_WEEK - day + 1));
    start.setUTCHours(0, 0, 0, 0);

    return start;
  }

  const start = new Date(date.getTime() - fromDays(day - 1));
  start.setUTCHours(0, 0, 0, 0);

  return start;
}

export function getWeeksInYear(year: number) {
  const start = startOfTheFirstWeekOfTheYear(year);
  const end = startOfTheFirstWeekOfTheYear(year + 1);

  return (end.getTime() - start.getTime()) / fromDays(7);
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

export function getWeekNumber(year: number, month: number, day: number) {
  const date = new Date(year, month, day);
  date.setUTCHours(0, 0, 0, 0);

  const start = startOfTheFirstWeekOfTheYear(date.getFullYear());
  const end = startOfTheFirstWeekOfTheYear(date.getFullYear() + 1);

  const weekDay = date.getDay() || DAYS_IN_WEEK;
  const weeksInYear = (end.getTime() - start.getTime()) / fromDays(7);

  if (date.getMonth() === 0 && date.getDate() < 7) {
    if (date.getTime() < start.getTime()) {
      return weeksInYear;
    }
  }

  if (end.getTime() <= date.getTime()) {
    if (weekDay < 4) {
      return 1;
    }

    return weeksInYear;
  }

  const startOfTheWeek = date.getTime() - fromDays(weekDay - 1);

  return (startOfTheWeek - start.getTime()) / fromDays(7) + 1;
}

export function getMonthForWeek(year: number, week: number) {
  const timestamp = startOfTheFirstWeekOfTheYear(year).getTime() + DAYS_IN_WEEK * week * fromDays(1);

  return new Date(timestamp).getMonth();
}
