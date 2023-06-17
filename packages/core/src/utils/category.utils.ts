import { formatDate, formatWeek } from './date.utils';
import { getWeekNumber } from './week.utils';

export function getDay(timestamp: string) {
  const date = new Date(timestamp);
  return formatDate(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getWeek(timestamp: string) {
  const date = new Date(timestamp);
  return formatWeek(date.getFullYear(), getWeekNumber(date.getFullYear(), date.getMonth(), date.getDate()));
}
