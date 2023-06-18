import { formatDate, formatWeek } from './date.utils';
import { getWeekNumber } from './week.utils';

export function getDay(timestamp: string) {
  const date = new Date(timestamp);
  return formatDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function getWeek(timestamp: string) {
  const date = new Date(timestamp);
  return formatWeek(date.getUTCFullYear(), getWeekNumber(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
