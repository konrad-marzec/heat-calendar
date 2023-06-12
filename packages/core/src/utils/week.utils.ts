import { DAYS_IN_WEEK } from '../constants/week.constants';

export function getWeekStartDay(year: number, month: number, week: number) {
  if (week === 1) {
    return 1;
  }

  return (week - 1) * DAYS_IN_WEEK - (new Date(year, month, 1).getDay() || DAYS_IN_WEEK) + 2;
}
